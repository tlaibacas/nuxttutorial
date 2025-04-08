import { Client } from "@hubspot/api-client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  try {
    const hubspotClient = new Client({
      accessToken: config.hubspotAccessToken,
    });

    const propertiesResponse =
      await hubspotClient.crm.properties.coreApi.getAll("contacts");
    const allProperties = propertiesResponse.results.map((p) => p.name);

    const limit = Number(query.limit) || 100;
    let after = query.after?.toString();
    let hasMore = true;
    const allContacts = [];

    while (hasMore) {
      const response = await hubspotClient.crm.contacts.basicApi.getPage(
        limit,
        after,
        allProperties
      );

      allContacts.push(...response.results);
      after = response.paging?.next?.after || undefined;
      hasMore = !!after;
    }

    const filteredData = allContacts
      .map((contact) => ({
        ...contact,
        properties: Object.entries(contact.properties).reduce(
          (acc, [key, value]) => {
            if (value !== null && value !== "" && value !== undefined) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, any>
        ),
      }))
      .filter(
        (contact) =>
          Object.keys(contact.properties).length > 0 &&
          (contact.properties.firstname ||
            contact.properties.lastname ||
            contact.properties.email)
      );

    const responseData = {
      data: filteredData,
      pagination: { next: after ? { after } : undefined },
    };

    console.log(
      "Filtered Contacts JSON:",
      JSON.stringify(responseData, null, 2)
    );

    return responseData;
  } catch (error) {
    console.error("HubSpot API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch contacts",
    });
  }
});

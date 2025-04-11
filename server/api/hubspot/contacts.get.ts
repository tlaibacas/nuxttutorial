import { Client as HubspotClient } from "@hubspot/api-client";
import { defineEventHandler, createError } from "h3";

const token = process.env.HUBSPOT_ACCESS_TOKEN;

if (!token) {
  console.warn("⚠️ HUBSPOT_ACCESS_TOKEN not defined in the environment!");
}

const hubspotClient = new HubspotClient({ accessToken: token });

export default defineEventHandler(async () => {
  try {
    const portalInfoResponse = await hubspotClient.apiRequest({
      method: "GET",
      path: "/integrations/v1/me",
    });

    const portalInfo = await portalInfoResponse.json();
    const portalId = portalInfo?.portalId;

    let after = undefined;
    let contactsFetched: any[] = [];
    let totalFetched = 0;

    while (true) {
      const response = await hubspotClient.crm.contacts.basicApi.getPage(
        100,
        after,
        [
          "firstname",
          "lastname",
          "email",
          "phone",
          "type_de_contact",
          "tiering_auxiliaire",
          "tiering_prescripteur",
          "statut_du_prescripteur",
        ]
      );

      const count = response?.results?.length || 0;
      totalFetched += count;

      if (count > 0) {
        contactsFetched.push(...response.results);
      }

      const nextPage = response?.paging?.next?.after;

      if (!nextPage) {
        break;
      }

      after = nextPage;
    }

    return {
      contacts: contactsFetched,
      total: contactsFetched.length,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || "Error fetching contacts",
    });
  }
});

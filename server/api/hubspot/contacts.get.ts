interface Contact {
  id: string;
  properties: Record<string, any>;
}

interface HubspotResponse {
  results: Contact[];
  paging?: {
    next?: {
      after: string;
    };
  };
}

export default defineEventHandler(
  async (
    event
  ): Promise<{ data: Contact[]; pagination: { next?: { after: string } } }> => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    const params = {
      properties: query.properties || "firstname,lastname,email,job_title",
      limit: query.limit || 100,
      after: query.after,
    };

    const response: HubspotResponse = await $fetch<HubspotResponse>(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        headers: {
          Authorization: `Bearer ${config.hubspotAccessToken}`,
        },
        params,
      }
    );

    return {
      data: response.results,
      pagination: {
        next: response.paging?.next,
      },
    };
  }
);

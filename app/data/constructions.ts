export type ResourceValue = number | string;

export interface Construction {
  output?: Record<string, ResourceValue>;
  requirements?: Record<string, number>;
  demand?: Record<string, number>;
  construction: {
    materials: number;
    workforce: number;
    time: number;
  };
  description: string;
}

export const constructionData: Record<string, Construction> = {
  "Housing District": {
    "output": {
      "shelter": 20
    },
    "requirements": {
      "workforce": 200
    },
    "demand": {
      "heat": 40
    },
    "construction": {
      "materials": 200,
      "workforce": 40,
      "time": 200
    },
    "description": "Provides Shelter in houses and other dwellings."
  },
  "Food District": {
    "output": {
      "food": 50
    },
    "requirements": {
      "workforce": 600
    },
    "demand": {
       "materials": 25,
      "heat": 40
    },
    "construction": {
      "materials": 600,
      "workforce": 40,
      "time": 200
    },
    "description": "Grows Food in Fertile Soil and prepares it for consumption."
  },
  "Extraction District": {
    "output": {
      "coal": 120,
      "prefabs": "+15/week"
    },
    "requirements": {
      "workforce": 600,
       "materials": 150,
       "materials2": 200
    },
    "demand": {
      "materials": 50,
      "heat": 20
    },
    "construction": {
      "materials": 600,
      "workforce": 40,
      "time": 150
    },
    "description": "Extracts Resources from Deposits. The type of Resource extracted depends on the underlying Deposit."
  },
  "Industrial District": {
    "output": {
      "prefabs": "+10/week"
    },
    "requirements": {
      "materials": 50,
      "workforce": 600
    },
    "demand": {
      "materials": 50,
      "heat": 20
    },
    "construction": {
      "materials": 600,
      "workforce": 40,
      "time": 100
    },
    "description": "Processes Materials into Prefabs or Goods. Can produce other Resource with additional infrastructure."
  },
  "Logistics": {
    "output": {
      "frostlandTeams": 15
    },
    "requirements": {
      "workforce": 400
    },
    "demand": {
      "materials": 25,
      "heat": 20
    },
    "construction": {
      "materials": 400,
      "workforce": 40,
      "time": 200
    },
    "description": "Sends Charting Expeditions to the Frostland and transports Resources between the City and its Colonies and Outposts."
  },
  "Research Institute": {
    "output": {
      "researchSpeed": "increased"
    },
    "requirements": {
      "workforce": 400
    },
    "demand": {
      "heat": 20
    },
    "construction":{
      "materials": 400,
      "workforce": 100,
      "time": 50
    },
    "description": "Facility dedicated to coming up with technological and sociological solutions to large-scale problems. Unlocks the Idea Tree. Each institute improves Research Speed."
  },
  "Council Hall": {
    "construction": {
      "materials": 200,
      "workforce": 80,
      "time": 40
    },
    "description": "Seat of the Council, where delegates representing the City's inhabitants meet to discuss and enact laws."
  }
};

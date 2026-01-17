import type { IPricing } from "../types";

export const pricingData: IPricing[] =[
  {
    "name": "Starter",
    "price": 19,
    "period": "month",
    "features": [
      "50 thumbnails",
      "Standard styles",
      "HD export",
      "Basic editor",
      "Community support"
    ],
    "mostPopular": false
  },
  {
    "name": "Creator",
    "price": 49,
    "period": "month",
    "features": [
      "300 thumbnails",
      "All styles",
      "Ultra HD export",
      "Advanced editor",
      "Brand kit",
      "Fast generation",
      "Priority support"
    ],
    "mostPopular": true
  },
  {
    "name": "Studio",
    "price": 129,
    "period": "month",
    "features": [
      "Unlimited thumbnails",
      "Custom styles",
      "Platform exports",
      "Team access",
      "Commercial license"
    ],
    "mostPopular": false
  }
]
;

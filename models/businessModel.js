const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  ownerName: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  ownerEmail: {
    type: String,
  },
  ownerImage: {
    type: String,
    default:
      "https://res.cloudinary.com/dlnkiwqfa/image/upload/v1700890727/gdigsqfldk4vliwgzfhm.svg",
  },
  link: String,
  category: String,
  businessName: {
    type: String,
    unique: true,
  },
  startDate: String,
  location: String,
  projectName: String,
  competitors: String,
  tagline: String,
  logoImage: String,
  listingImage: String,
  description: String,
  businessModel: String,
  growthOpportunity: String,
  projectBackground: String,
  sellingReasoning: String,
  techStack: String,
  askingPrice: String,
  multiplies: String,
  ttmRevenue: String,
  ttmProfit: String,
  monthlyProfit: String,
  monthlyRevenue: String,
  lastMonthRevenue: String,
  lastMonthProfit: String,
  ttmGrossRevenue: String,
  ttmNetProfit: String,
  financing: String,
  teamSize: String,
  lastMonthGrossRevenue: String,
  lastMonthNetProfit: String,
  customers: String,
  annualRecurringRevenue: String,
  annualGrowthRate: String,
  valuation: String,
  documentProof: String,
  InstagramHandle: String,
  InstagramHandleFollowers: String,
  TwitterHandle: String,
  TwitterHandleFollowers: String,
  FacebookHandle: String,
  FacebookHandleFollowers: String,
  YoutubeHandle: String,
  YoutubeHandleFollowers: String,
  maxPrice: String,
  minPrice: String,
});

module.exports = new mongoose.model("businessDatas", businessSchema);

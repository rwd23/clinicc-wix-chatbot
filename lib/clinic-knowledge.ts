export type VerifiedAnswer = {
  id: string;
  questionPatterns: string[];
  answer: string;
  suggestions?: Array<{
    label: string;
    url: string;
  }>;
};

export type TreatmentPrice = {
  id: string;
  aliases: string[];
  answer: string;
};

export type TreatmentFaq = {
  id: string;
  treatmentAliases: string[];
  questionPatterns: string[];
  answer: string;
  suggestions?: Array<{
    label: string;
    url: string;
  }>;
};

export const clinicPriceListUrl =
  "https://www.clinicc.co.uk/_files/ugd/2d1435_5bbb0b8d019b42128cac3214d5d37b19.pdf";

export const clinicOpeningHours = {
  monday: "Closed",
  tuesday: "10am to 6pm",
  wednesday: "11am to 7pm",
  thursday: "12pm to 8pm",
  friday: "9am to 2pm",
  saturday: "10am to 5pm",
  sunday: "Closed"
} as const;

export const verifiedAnswers: VerifiedAnswer[] = [
  {
    id: "contact-details",
    questionPatterns: [
      "phone",
      "telephone",
      "call",
      "number",
      "email",
      "contact",
      "address",
      "where are you",
      "where is the clinic",
      "location"
    ],
    answer:
      "Clinic C is at 365 Holburn Street, Aberdeen, AB10 7FQ. You can contact the clinic on 01224 454145 or by email at info@clinic-c.co.uk.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "opening-hours",
    questionPatterns: [
      "opening hours",
      "hours",
      "open today",
      "what time do you open",
      "what time do you close",
      "when are you open"
    ],
    answer:
      "Clinic C operates mainly on an appointment-only basis, but the general opening hours are: Monday closed, Tuesday 10am to 6pm, Wednesday 11am to 7pm, Thursday 12pm to 8pm, Friday 9am to 2pm, Saturday 10am to 5pm, and Sunday closed.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "parking",
    questionPatterns: [
      "parking",
      "park",
      "car park",
      "onsite parking",
      "on site parking"
    ],
    answer:
      "Clinic C offers free parking right outside the clinic and on the surrounding streets, including Holburn Street, Balmoral Road, and Hardgate.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "accessibility-unverified",
    questionPatterns: [
      "wheelchair",
      "accessible",
      "accessibility",
      "disabled access",
      "lift",
      "stairs",
      "step free",
      "step-free"
    ],
    answer:
      "I don't currently have a verified public accessibility summary for Clinic C, so I don't want to make assumptions. If you have any mobility, access, or practical requirements, please contact the clinic directly so they can advise you properly before your visit.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "book-online",
    questionPatterns: [
      "book",
      "booking",
      "book online",
      "appointment",
      "appointments"
    ],
    answer:
      "Clinic C has a public Book Online page covering Health, Body, Face, and Laser categories. That includes services such as IV Nutrient Therapy, Aqualyx, EMSculpt, Anti-Wrinkle Injections, HydraFacial, Profhilo, Jalupro, Laser Hair Removal, and more.",
    suggestions: [
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "consultation-policy-general",
    questionPatterns: [
      "consultation policy",
      "do i need a consultation",
      "need a consultation",
      "consultation required",
      "initial consultation"
    ],
    answer:
      "Clinic C's website presents consultation as an important part of the client journey. For some treatments, a consultation is used to confirm suitability and the right plan before treatment. For IV nutrient therapy specifically, the website states that all clients require a £25 consultation with Dr Mahmood before booking IV treatment.",
    suggestions: [
      {
        label: "View Health Clinic",
        url: "https://www.clinicc.co.uk/health-clinic-in-aberdeen"
      },
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "iv-consultation-policy",
    questionPatterns: [
      "iv consultation",
      "iv therapy consultation",
      "consultation for iv",
      "drip consultation",
      "vitamin drip consultation"
    ],
    answer:
      "For IV nutrient therapy, Clinic C's website says all clients require a consultation priced at £25 with Dr Mahmood before booking IV treatments. That consultation is used to review medical history and health and wellbeing goals so the clinic can advise on the most suitable IV option.",
    suggestions: [
      {
        label: "View Health Clinic",
        url: "https://www.clinicc.co.uk/health-clinic-in-aberdeen"
      }
    ]
  },
  {
    id: "deposit-policy",
    questionPatterns: [
      "deposit",
      "deposits",
      "do i pay a deposit",
      "booking deposit",
      "prepay",
      "pre-pay"
    ],
    answer:
      "Clinic C's Terms & Conditions state that all bookings require a minimum 50% deposit at the time of booking, whether the booking is made in person or through the online booking system.",
    suggestions: [
      {
        label: "View Terms & Conditions",
        url: "https://www.clinicc.co.uk/faq-s"
      }
    ]
  },
  {
    id: "cancellation-policy",
    questionPatterns: [
      "cancel",
      "cancellation",
      "reschedule",
      "refund",
      "missed appointment",
      "late cancellation"
    ],
    answer:
      "Clinic C's Terms & Conditions say standard cancellation is up to 24 hours before your treatment. If you cancel within 24 hours, you may be charged in full. If you cancel within 48 hours, 50% of the treatment total may be deducted. Treatments missed or not rescheduled within 24 hours can result in the deposit becoming non-refundable and the appointment being charged in full.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "cryotherapy-blocks",
    questionPatterns: [
      "cryotherapy block",
      "cryotherapy package",
      "cryotherapy sessions expire",
      "how long do cryotherapy sessions last",
      "cryotherapy expiry"
    ],
    answer:
      "Clinic C's Terms & Conditions state that whole body cryotherapy blocks must be used within 3 months. Any remaining sessions after that time are lost and another block would need to be purchased.",
    suggestions: [
      {
        label: "View Cryotherapy",
        url: "https://www.clinicc.co.uk/cryotherapy-in-aberdeen"
      }
    ]
  },
  {
    id: "refund-policy",
    questionPatterns: [
      "refund",
      "refunds",
      "money back",
      "change my mind"
    ],
    answer:
      "Clinic C's Terms & Conditions say refunds are provided where required under Scottish consumer law. The website also says they cannot refund products or services for a change of mind.",
    suggestions: [
      {
        label: "Contact Clinic C",
        url: "https://www.clinicc.co.uk/contact"
      }
    ]
  },
  {
    id: "aftercare-basics-general",
    questionPatterns: [
      "aftercare",
      "after care",
      "after treatment",
      "recovery",
      "downtime",
      "what should i do after"
    ],
    answer:
      "Clinic C describes aftercare as part of the client journey, but aftercare advice varies by treatment. The safest answer is to follow the personalised guidance given by your clinician after your appointment. If you tell me which treatment you're asking about, I can give a more specific, website-grounded answer where one is available.",
    suggestions: [
      {
        label: "View FAQ",
        url: "https://www.clinicc.co.uk/faq-s"
      }
    ]
  },
  {
    id: "emsculpt-aftercare",
    questionPatterns: [
      "emsculpt aftercare",
      "emsculpt downtime",
      "recovery from emsculpt",
      "does emsculpt hurt"
    ],
    answer:
      "Clinic C's EMSculpt page says EMSculpt is non-invasive and requires no recovery time. It also says some clients experience mild soreness or tiredness in the treated area, but nothing as intense as a traditional workout.",
    suggestions: [
      {
        label: "View EMSculpt",
        url: "https://www.clinicc.co.uk/emsculpt-in-aberdeen"
      }
    ]
  },
  {
    id: "rf-downtime",
    questionPatterns: [
      "rf downtime",
      "radio frequency downtime",
      "rf skin tightening downtime",
      "does rf skin tightening have downtime"
    ],
    answer:
      "Clinic C's RF Skin Tightening page describes the treatment as pain-free with no downtime.",
    suggestions: [
      {
        label: "View RF Skin Tightening",
        url: "https://www.clinicc.co.uk/rf-skin-tightening"
      }
    ]
  },
  {
    id: "anti-wrinkle-suitability",
    questionPatterns: [
      "who is anti wrinkle for",
      "suitable for anti wrinkle",
      "am i suitable for botox",
      "anti wrinkle suitable",
      "who is suitable for anti wrinkle injections"
    ],
    answer:
      "Clinic C's anti-wrinkle page says the treatment is suitable for adults who want to reduce the appearance of fine lines and wrinkles or help prevent them from forming. The website also says a consultation is always carried out to ensure the treatment is appropriate for your individual needs.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "anti-wrinkle-results-timing",
    questionPatterns: [
      "how long for anti wrinkle results",
      "when will botox work",
      "anti wrinkle results",
      "how long do anti wrinkle injections last"
    ],
    answer:
      "Clinic C's anti-wrinkle page says results may begin to show within 3 to 5 days, with full results developing over 10 to 14 days. The same page says results typically last around 3 to 4 months.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "hydrafacial-suitability",
    questionPatterns: [
      "who is hydrafacial for",
      "hydrafacial suitable",
      "what does hydrafacial help with",
      "hydrafacial for acne",
      "hydrafacial for blackheads"
    ],
    answer:
      "Clinic C's HydraFacial page says the treatment is tailored to individual skin concerns and focuses on hydration, texture, fine lines, pigmentation, acne, congestion, blackheads, and creating a healthy glow.",
    suggestions: [
      {
        label: "View HydraFacial",
        url: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen"
      }
    ]
  },
  {
    id: "acne-consultation-first",
    questionPatterns: [
      "acne",
      "spots",
      "breakouts",
      "blemishes",
      "acne scars",
      "what treatment is best for acne",
      "best treatment for acne"
    ],
    answer:
      "If acne or breakout-prone skin is the concern, the best first step at Clinic C would be a consultation. That gives the team a chance to assess your skin properly and guide you towards the treatment plan that suits you best, rather than assuming there is one universal answer for every type of acne.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "rosacea-consultation-first",
    questionPatterns: [
      "rosacea",
      "redness",
      "flushing",
      "what treatment is best for rosacea",
      "best treatment for rosacea"
    ],
    answer:
      "If rosacea, redness, or flushing is the concern, the best starting point at Clinic C would be a consultation. That allows the team to assess your skin carefully and recommend the most appropriate plan for you, rather than jumping straight to one treatment without understanding the full picture.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "pigmentation-consultation-first",
    questionPatterns: [
      "pigmentation",
      "sun damage",
      "dark spots",
      "uneven skin tone",
      "what treatment is best for pigmentation",
      "best treatment for pigmentation"
    ],
    answer:
      "If pigmentation, sun damage, or uneven tone is the concern, Clinic C would advise a consultation first. Pigmentation can behave quite differently depending on the cause, so the right approach is to assess your skin properly first and then recommend the treatment plan that fits best.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "melasma-consultation-first",
    questionPatterns: [
      "melasma",
      "what treatment is best for melasma",
      "best treatment for melasma"
    ],
    answer:
      "If melasma is the concern, the best first step at Clinic C would be a consultation. Melasma can be more complex than it first appears, so it is much better to have your skin reviewed properly and then be guided towards the safest and most suitable plan.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "sensitivity-consultation-first",
    questionPatterns: [
      "sensitive skin",
      "sensitivity",
      "reactive skin",
      "irritated skin",
      "what treatment is best for sensitive skin",
      "best treatment for sensitive skin"
    ],
    answer:
      "If sensitive or reactive skin is the concern, Clinic C would advise starting with a consultation. That allows the team to understand your skin more carefully and recommend an approach that feels appropriate and considered, rather than risking the wrong treatment too soon.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "scarring-consultation-first",
    questionPatterns: [
      "scarring",
      "scar",
      "acne scars",
      "what treatment is best for scarring",
      "best treatment for scarring"
    ],
    answer:
      "If scarring or acne scarring is the concern, the best next step at Clinic C would be a consultation first. That gives the team the chance to assess the type and depth of scarring and then recommend the most appropriate treatment plan for your skin.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "dull-skin-consultation-first",
    questionPatterns: [
      "dull skin",
      "tired skin",
      "glow",
      "what treatment is best for dull skin",
      "best treatment for dull skin"
    ],
    answer:
      "If dull or tired-looking skin is the concern, Clinic C would still advise a consultation first. That way, the team can understand what your skin needs and guide you towards the right plan, whether that is more hydration-focused, more resurfacing-led, or centred around overall skin quality.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "ageing-consultation-first",
    questionPatterns: [
      "ageing",
      "aging",
      "fine lines",
      "lines and wrinkles",
      "what treatment is best for ageing",
      "what treatment is best for aging",
      "best treatment for wrinkles"
    ],
    answer:
      "If the main concern is ageing, fine lines, or wrinkles, the best first step at Clinic C would be a consultation. That allows the team to understand whether the priority is lines, skin quality, hydration, firmness, or a combination of those, and then guide you towards the most suitable plan.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "unwanted-hair-consultation-first",
    questionPatterns: [
      "unwanted hair",
      "hair growth",
      "facial hair",
      "body hair",
      "what treatment is best for unwanted hair",
      "best treatment for unwanted hair"
    ],
    answer:
      "If unwanted hair is the concern, Clinic C would usually advise a laser consultation first. That gives the team the chance to confirm the area, skin type, and the most suitable treatment plan for you before moving ahead.",
    suggestions: [
      {
        label: "View Laser Hair Removal",
        url: "https://www.clinicc.co.uk/it/laser-hair-removal"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "skin-tags-consultation-first",
    questionPatterns: [
      "skin tag",
      "skin tags",
      "what treatment is best for skin tags",
      "best treatment for skin tags"
    ],
    answer:
      "If skin tags are the concern, Clinic C would advise a consultation first so the area can be assessed properly and the most suitable next step can be recommended. For concerns like this, it is always better to review the skin in person before assuming treatment.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "warts-consultation-first",
    questionPatterns: [
      "wart",
      "warts",
      "verruca",
      "verrucas",
      "what treatment is best for warts",
      "best treatment for warts"
    ],
    answer:
      "If warts or verrucas are the concern, Clinic C would advise a consultation first so the area can be assessed properly and the most appropriate next step can be recommended. It is always better to review the skin carefully before deciding on treatment.",
    suggestions: [
      {
        label: "View Face Treatments",
        url: "https://www.clinicc.co.uk/face"
      },
      {
        label: "Open Book Online",
        url: "https://www.clinicc.co.uk/book-online"
      }
    ]
  },
  {
    id: "profhilo-suitability",
    questionPatterns: [
      "who is profhilo for",
      "profhilo suitable",
      "what does profhilo help with",
      "profhilo dull skin",
      "profhilo firmness"
    ],
    answer:
      "Clinic C's Profhilo page presents it as a skin remodelling treatment for skin that lacks volume and elasticity, especially when someone wants hydration, firmness, and improvement in tired or dull-looking skin rather than traditional filler-style volume.",
    suggestions: [
      {
        label: "View Profhilo",
        url: "https://www.clinicc.co.uk/profhilo-in-aberdeen"
      }
    ]
  },
  {
    id: "jalupro-suitability",
    questionPatterns: [
      "who is jalupro for",
      "jalupro suitable",
      "what does jalupro help with",
      "jalupro tired eyes",
      "jalupro skin texture"
    ],
    answer:
      "Clinic C's Jalupro page says Jalupro is used to improve skin texture, minimise skin wrinkles, and revitalise appearance, with particular emphasis on tone, volume, and tired-looking areas such as the eye area.",
    suggestions: [
      {
        label: "View Jalupro",
        url: "https://www.clinicc.co.uk/jalupro-in-aberdeen"
      }
    ]
  },
  {
    id: "aqualyx-suitability",
    questionPatterns: [
      "who is aqualyx for",
      "aqualyx suitable",
      "what areas can aqualyx treat",
      "aqualyx chin",
      "aqualyx stomach"
    ],
    answer:
      "Clinic C's Aqualyx page says it is for men and women who want to reduce stubborn pockets of localised subcutaneous fat. The page lists areas such as the thighs, knees, buttocks, hips, stomach, chin, and back as potentially suitable.",
    suggestions: [
      {
        label: "View Aqualyx",
        url: "https://www.clinicc.co.uk/aqualyx-fat-dissolving-in-aberdeen"
      }
    ]
  },
  {
    id: "aqualyx-results-timing",
    questionPatterns: [
      "when do aqualyx results show",
      "how many aqualyx treatments",
      "aqualyx results",
      "aqualyx treatment plan"
    ],
    answer:
      "Clinic C's Aqualyx page says you may start to see results after the first treatment, but most clients require at least two treatments or more depending on the area. The same page says treatments are administered 6 weeks apart.",
    suggestions: [
      {
        label: "View Aqualyx",
        url: "https://www.clinicc.co.uk/aqualyx-fat-dissolving-in-aberdeen"
      }
    ]
  },
  {
    id: "emsculpt-suitability",
    questionPatterns: [
      "who is emsculpt for",
      "emsculpt suitable",
      "what areas can emsculpt treat",
      "emsculpt glutes",
      "emsculpt abdomen"
    ],
    answer:
      "Clinic C's EMSculpt page says it is commonly done on the abdomen and glutes, and describes it as suitable for clients who want muscle tone and enhanced fat reduction without surgery.",
    suggestions: [
      {
        label: "View EMSculpt",
        url: "https://www.clinicc.co.uk/emsculpt-in-aberdeen"
      }
    ]
  },
  {
    id: "faq-page",
    questionPatterns: [
      "faq",
      "frequently asked",
      "do you have an faq"
    ],
    answer:
      "Yes, Clinic C has a public FAQ page on the website. If you want, I can also help direct you to the most relevant treatment page based on what you're asking about.",
    suggestions: [
      {
        label: "View FAQ",
        url: "https://www.clinicc.co.uk/faq-s"
      }
    ]
  }
];

export const treatmentPrices: TreatmentPrice[] = [
  {
    id: "hydrafacial",
    aliases: ["hydrafacial", "hydra facial"],
    answer:
      "Clinic C's published prices for HydraFacial are: HydraFacial Skin for Life £160, HydraFacial Perk Lip & Eye £220, and HydraFacial Complete £260."
  },
  {
    id: "anti-wrinkle",
    aliases: ["anti wrinkle", "anti-wrinkle", "botox", "wrinkle injections"],
    answer:
      "Clinic C's published prices for anti-wrinkle injections are from £160 for 1 area and from £325 for 3 areas."
  },
  {
    id: "profhilo",
    aliases: ["profhilo"],
    answer:
      "Clinic C's published prices for Profhilo are £325 for 1 course and £585 for a course of 2."
  },
  {
    id: "jalupro",
    aliases: ["jalupro"],
    answer:
      "Clinic C's published prices for Jalupro are Jalupro Classic £200, Jalupro HMW £250, and Jalupro plus Botulinum Toxin £350."
  },
  {
    id: "cryotherapy",
    aliases: ["cryotherapy", "whole body cryotherapy"],
    answer:
      "Clinic C's published prices for whole body cryotherapy are £35 for a single session, £160 for a course of 5, and £300 for a course of 10."
  }
] as const;

export const treatmentFaqs: TreatmentFaq[] = [
  {
    id: "hydrafacial-duration",
    treatmentAliases: ["hydrafacial", "hydra facial"],
    questionPatterns: ["how long", "last", "take", "duration", "treatment time"],
    answer:
      "A HydraFacial at Clinic C typically takes between 30 and 60 minutes, depending on your skin concerns. It is designed to be a quick, non-invasive treatment with no downtime, which makes it a very easy treatment to fit into a busy schedule.",
    suggestions: [
      { label: "View HydraFacial", url: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen" }
    ]
  },
  {
    id: "hydrafacial-results",
    treatmentAliases: ["hydrafacial", "hydra facial"],
    questionPatterns: ["results", "how soon", "when will i see", "when can i see", "glow"],
    answer:
      "Clinic C says many clients see an improvement in their skin straight after one HydraFacial treatment. The fresh, hydrated glow often lasts around 5 to 7 days or sometimes longer, and monthly treatments are recommended for maintaining the best ongoing results.",
    suggestions: [
      { label: "View HydraFacial", url: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen" }
    ]
  },
  {
    id: "hydrafacial-acne",
    treatmentAliases: ["hydrafacial", "hydra facial"],
    questionPatterns: ["acne", "breakouts", "congestion", "blackheads"],
    answer:
      "Yes, Clinic C describes HydraFacial as a strong option for acne-prone or congested skin because it deeply cleanses pores, removes impurities, and hydrates the skin at the same time. Many clients choose it as part of a regular routine to help improve breakouts and congestion.",
    suggestions: [
      { label: "View HydraFacial", url: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen" }
    ]
  },
  {
    id: "anti-wrinkle-how-it-works",
    treatmentAliases: ["anti wrinkle", "anti-wrinkle", "botox", "wrinkle injections"],
    questionPatterns: ["how does it work", "how do they work", "how work", "work"],
    answer:
      "Clinic C explains that anti-wrinkle injections work by relaxing the facial muscles that create expression lines. By temporarily reducing that muscle movement, the skin appears smoother and lines across the forehead, frown area, and around the eyes can soften noticeably.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "anti-wrinkle-areas",
    treatmentAliases: ["anti wrinkle", "anti-wrinkle", "botox", "wrinkle injections"],
    questionPatterns: ["what areas", "areas", "where can", "treat"],
    answer:
      "Clinic C says anti-wrinkle injections are commonly used for forehead lines, frown lines between the brows, and crow's feet around the eyes. The clinic also notes that more advanced areas can include jaw slimming, gummy smile correction, and neck rejuvenation.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "anti-wrinkle-duration",
    treatmentAliases: ["anti wrinkle", "anti-wrinkle", "botox", "wrinkle injections"],
    questionPatterns: ["how long", "last", "duration"],
    answer:
      "Clinic C says results from anti-wrinkle injections typically last around 3 to 4 months. With regular treatments, results may last a little longer over time as the muscles become more trained to relax.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "anti-wrinkle-results-timing-faq",
    treatmentAliases: ["anti wrinkle", "anti-wrinkle", "botox", "wrinkle injections"],
    questionPatterns: ["how soon", "when will i see", "when can i see", "results", "how long to see results"],
    answer:
      "Clinic C says you may begin to notice the effect of anti-wrinkle injections within 3 to 5 days, with full results typically developing over 10 to 14 days. A follow-up appointment may also be recommended to review your result.",
    suggestions: [
      {
        label: "View Anti-Wrinkle Injections",
        url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen"
      }
    ]
  },
  {
    id: "jalupro-suitable",
    treatmentAliases: ["jalupro"],
    questionPatterns: ["who is it for", "suitable", "who is suitable", "good for"],
    answer:
      "Clinic C describes Jalupro as ideal for clients who want to improve skin quality, hydration, and early signs of ageing. It is positioned as a natural-looking skin rejuvenation treatment for those who want refreshed skin quality rather than added facial volume.",
    suggestions: [
      { label: "View Jalupro", url: "https://www.clinicc.co.uk/jalupro-in-aberdeen" }
    ]
  },
  {
    id: "jalupro-vs-fillers",
    treatmentAliases: ["jalupro"],
    questionPatterns: ["different from filler", "different from dermal fillers", "fillers", "difference"],
    answer:
      "Clinic C explains that Jalupro is different from dermal fillers because it does not add volume or change facial shape. Instead, it focuses on improving skin quality by stimulating collagen and enhancing hydration, which makes it better suited to subtle, natural-looking rejuvenation.",
    suggestions: [
      { label: "View Jalupro", url: "https://www.clinicc.co.uk/jalupro-in-aberdeen" }
    ]
  },
  {
    id: "jalupro-areas",
    treatmentAliases: ["jalupro"],
    questionPatterns: ["what areas", "areas", "where can", "treat"],
    answer:
      "Clinic C says Jalupro can be used on the face, neck, décolletage, and under-eye area. It is presented as particularly effective where there are fine lines, skin laxity, or early signs of ageing.",
    suggestions: [
      { label: "View Jalupro", url: "https://www.clinicc.co.uk/jalupro-in-aberdeen" }
    ]
  },
  {
    id: "jalupro-results",
    treatmentAliases: ["jalupro"],
    questionPatterns: ["when will i see", "how soon", "results", "when can i see"],
    answer:
      "Clinic C says many clients notice an improvement in hydration and skin texture within a few days of Jalupro, with continued improvement over the following weeks as collagen production increases.",
    suggestions: [
      { label: "View Jalupro", url: "https://www.clinicc.co.uk/jalupro-in-aberdeen" }
    ]
  },
  {
    id: "jalupro-benefits",
    treatmentAliases: ["jalupro"],
    questionPatterns: ["benefits", "what does it help with", "what does jalupro do"],
    answer:
      "Clinic C describes Jalupro as helping to improve hydration, elasticity, and firmness while reducing the appearance of fine lines and wrinkles. The overall goal is smoother, healthier, more refreshed-looking skin.",
    suggestions: [
      { label: "View Jalupro", url: "https://www.clinicc.co.uk/jalupro-in-aberdeen" }
    ]
  },
  {
    id: "profhilo-how-it-works",
    treatmentAliases: ["profhilo"],
    questionPatterns: ["how does it work", "how work", "what does it do"],
    answer:
      "Clinic C describes Profhilo as an injectable skin remodelling treatment with a very high concentration of hyaluronic acid. It acts more as a deep hydrator than a traditional filler, helping skin that feels dull, tired, or lacking in elasticity to look firmer, more luminous, and better hydrated.",
    suggestions: [
      { label: "View Profhilo", url: "https://www.clinicc.co.uk/profhilo-in-aberdeen" }
    ]
  },
  {
    id: "profhilo-results",
    treatmentAliases: ["profhilo"],
    questionPatterns: ["when will i see", "how soon", "results", "when can i see"],
    answer:
      "Clinic C says the initial hydrating effect of Profhilo can start to show within 3 to 5 days. The skin-tightening and collagen-stimulating effect continues to build over the following weeks, with the maximum effect usually seen around 2 months after the second treatment.",
    suggestions: [
      { label: "View Profhilo", url: "https://www.clinicc.co.uk/profhilo-in-aberdeen" }
    ]
  },
  {
    id: "emsculpt-recovery",
    treatmentAliases: ["emsculpt"],
    questionPatterns: ["recovery", "downtime", "aftercare", "after care"],
    answer:
      "Clinic C says EMSculpt is non-invasive and requires no recovery time. There is no special preparation or aftercare plan, although some clients do notice mild soreness or tiredness in the treated area afterwards, more like a workout than a medical recovery.",
    suggestions: [
      { label: "View EMSculpt", url: "https://www.clinicc.co.uk/emsculpt-in-aberdeen" }
    ]
  },
  {
    id: "emsculpt-pain",
    treatmentAliases: ["emsculpt"],
    questionPatterns: ["hurt", "pain", "painful", "does it hurt"],
    answer:
      "Clinic C says EMSculpt should not be painful. Clients often describe the sensation more as a strong pulling or contracting feeling, and the therapist can control the intensity so it remains comfortable throughout the session.",
    suggestions: [
      { label: "View EMSculpt", url: "https://www.clinicc.co.uk/emsculpt-in-aberdeen" }
    ]
  }
] as const;

export const groundingRules = [
  "If a question matches verified clinic information, use that answer instead of improvising.",
  "If an answer is not verified, do not guess or make up details.",
  "For uncertain operational questions such as parking, access, exact availability, or opening hours, say clearly that you do not have a verified answer and direct the user to contact the clinic.",
  "When a policy question is answered from the website terms, keep the wording faithful to the published policy and avoid softening or expanding it."
] as const;

function normalize(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function containsAll(normalized: string, parts: string[]) {
  return parts.every((part) => normalized.includes(normalize(part)));
}

export function findDeterministicClinicAnswer(userMessage: string) {
  const normalized = normalize(userMessage);

  const matchedFaq = treatmentFaqs.find((entry) =>
    entry.treatmentAliases.some((alias) => normalized.includes(normalize(alias))) &&
    entry.questionPatterns.some((pattern) => normalized.includes(normalize(pattern)))
  );

  if (matchedFaq) {
    return {
      id: `faq-${matchedFaq.id}`,
      questionPatterns: [...matchedFaq.treatmentAliases, ...matchedFaq.questionPatterns],
      answer: matchedFaq.answer,
      suggestions: matchedFaq.suggestions ?? []
    } satisfies VerifiedAnswer;
  }

  const isPriceQuestion =
    normalized.includes("how much") ||
    normalized.includes("price") ||
    normalized.includes("cost") ||
    normalized.includes("pricing");

  if (isPriceQuestion) {
    const matchedPrice = treatmentPrices.find((entry) =>
      entry.aliases.some((alias) => normalized.includes(normalize(alias)))
    );

    if (matchedPrice) {
      return {
        id: `price-${matchedPrice.id}`,
        questionPatterns: matchedPrice.aliases,
        answer: `${matchedPrice.answer} You can also view the full Clinic C pricing guide using the button below.`,
        suggestions: [
          {
            label: "Open Pricing Guide",
            url: clinicPriceListUrl
          }
        ]
      } satisfies VerifiedAnswer;
    }

    return {
      id: "price-guide",
      questionPatterns: ["price", "cost", "pricing", "how much"],
      answer:
        "You can view the full Clinic C pricing guide using the button below.",
      suggestions: [
        {
          label: "Open Pricing Guide",
          url: clinicPriceListUrl
        }
      ]
    } satisfies VerifiedAnswer;
  }

  if (
    containsAll(normalized, ["offer", "parking"]) ||
    containsAll(normalized, ["have", "parking"]) ||
    containsAll(normalized, ["onsite", "parking"]) ||
    containsAll(normalized, ["on site", "parking"]) ||
    normalized.includes("car park") ||
    normalized.includes("parking")
  ) {
    return verifiedAnswers.find((answer) => answer.id === "parking") ?? null;
  }

  if (
    normalized.includes("open today") ||
    normalized.includes("opening hours") ||
    normalized.includes("what time do you open") ||
    normalized.includes("what time do you close") ||
    normalized.includes("when are you open") ||
    normalized.includes("hours")
  ) {
    return verifiedAnswers.find((answer) => answer.id === "opening-hours") ?? null;
  }

  return verifiedAnswers.find((entry) =>
    entry.questionPatterns.some((pattern) => normalized.includes(normalize(pattern)))
  ) ?? null;
}

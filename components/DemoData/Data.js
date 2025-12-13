// =================================================== //
// =================== Occupations =================== //
// =================================================== //
export const occupations = [
  "Select occupation",
  "Government Job",
  "Private Job",
  "Self Employed",
  "Business",
  "Other",
];

// ====================================================== //
// =================== Marriage Types =================== //
// ====================================================== //
export const marriageTypes = [
  "Select marriage type",
  "Unmarried",
  "Divorced",
  "Widowed",
  "Separated",
  "Other",
];

// ==================================================== //
// ====================== Religions =================== //
// ==================================================== //
export const religions = [
  "Select Religion",
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Other",
];

// ==================================================== //
// =================== Castes by Religion ============= //
// ==================================================== //
export const castesByReligion = {
  Hindu: [
    "Select Caste",
    "Brahmin",
    "Kshatriya",
    "Vaishya",
    "Shudra",
    "Other",
  ],
  Muslim: [
    "Select Caste",
    "Malik",
    "Sheikh",
    "Syed",
    "Pathan",
    "Ansari",
    "Other",
  ],
  Christian: [
    "Select Caste",
    "Roman Catholic",
    "Protestant",
    "Syrian Christian",
    "Other",
  ],
  Sikh: [
    "Select Caste",
    "Jat Sikh",
    "Khatri",
    "Ramgarhia",
    "Arora",
    "Other",
  ],
  Buddhist: [
    "Select Caste",
    "Mahar",
    "Navayana",
    "Other",
  ],
  Jain: [
    "Select Caste",
    "Shwetambar",
    "Digambar",
    "Other",
  ],
  Other: [
    "Select Caste",
    "Other",
  ],
};

// Fallback if religion is not selected or invalid
export const defaultCastes = [
  "Select Caste",
  "Other",
];
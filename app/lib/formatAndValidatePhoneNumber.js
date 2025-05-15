// Country-specific phone number validation rules
const generateCountryRules = () => {
    return {
      '+93': { // Afghanistan
        minLength: 9,
        maxLength: 9,
      },
      '+358': { // Aland Islands (Finland)
        minLength: 5,
        maxLength: 12,
      },
      '+355': { // Albania
        minLength: 9,
        maxLength: 9,
      },
      '+213': { // Algeria
        minLength: 8,
        maxLength: 9,
      },
      '+1': { // American Samoa/Canada/USA
        minLength: 10,
        maxLength: 10,
      },
      '+376': { // Andorra
        minLength: 6,
        maxLength: 9,
      },
      '+244': { // Angola
        minLength: 9,
        maxLength: 9,
      },
      '+54': { // Argentina
        minLength: 10,
        maxLength: 12,
      },
      '+374': { // Armenia
        minLength: 8,
        maxLength: 8,
      },
      '+297': { // Aruba
        minLength: 7,
        maxLength: 7,
      },
      '+61': { // Australia
        minLength: 9,
        maxLength: 9,
      },
      '+43': { // Austria
        minLength: 10,
        maxLength: 13,
      },
      '+994': { // Azerbaijan
        minLength: 9,
        maxLength: 9,
      },
      '+973': { // Bahrain
        minLength: 8,
        maxLength: 8,
      },
      '+880': { // Bangladesh
        minLength: 10,
        maxLength: 10,
        removeLeadingZero: true
      },
      '+375': { // Belarus
        minLength: 9,
        maxLength: 9,
      },
      '+32': { // Belgium
        minLength: 9,
        maxLength: 9,
      },
      '+501': { // Belize
        minLength: 7,
        maxLength: 7,
      },
      '+229': { // Benin
        minLength: 8,
        maxLength: 8,
      },
      '+975': { // Bhutan
        minLength: 8,
        maxLength: 8,
      },
      '+591': { // Bolivia
        minLength: 8,
        maxLength: 8,
      },
      '+387': { // Bosnia & Herzegovina
        minLength: 8,
        maxLength: 9,
      },
      '+267': { // Botswana
        minLength: 7,
        maxLength: 8,
      },
      '+55': { // Brazil
        minLength: 10,
        maxLength: 11,
      },
      '+246': { // British Indian Ocean Territory
        minLength: 7,
        maxLength: 7,
      },
      '+673': { // Brunei
        minLength: 7,
        maxLength: 7,
      },
      '+359': { // Bulgaria
        minLength: 9,
        maxLength: 9,
      },
      '+226': { // Burkina Faso
        minLength: 8,
        maxLength: 8,
      },
      '+257': { // Burundi
        minLength: 8,
        maxLength: 8,
      },
      '+855': { // Cambodia
        minLength: 8,
        maxLength: 9,
      },
      '+237': { // Cameroon
        minLength: 9,
        maxLength: 9,
      },
      '+238': { // Cape Verde
        minLength: 7,
        maxLength: 7,
      },
      '+599': { // Caribbean Netherlands
        minLength: 7,
        maxLength: 8,
      },
      '+236': { // Central African Republic
        minLength: 8,
        maxLength: 8,
      },
      '+235': { // Chad
        minLength: 8,
        maxLength: 8,
      },
      '+56': { // Chile
        minLength: 9,
        maxLength: 9,
      },
      '+86': { // China
        minLength: 11,
        maxLength: 11,
      },
      '+57': { // Colombia
        minLength: 10,
        maxLength: 10,
      },
      '+269': { // Comoros
        minLength: 7,
        maxLength: 7,
      },
      '+242': { // Congo - Brazzaville
        minLength: 9,
        maxLength: 9,
      },
      '+243': { // Congo - Kinshasa
        minLength: 9,
        maxLength: 9,
      },
      '+682': { // Cook Islands
        minLength: 5,
        maxLength: 5,
      },
      '+506': { // Costa Rica
        minLength: 8,
        maxLength: 8,
      },
      '+225': { // Côte d'Ivoire
        minLength: 10,
        maxLength: 10,
      },
      '+385': { // Croatia
        minLength: 9,
        maxLength: 9,
      },
      '+53': { // Cuba
        minLength: 8,
        maxLength: 8,
      },
      '+357': { // Cyprus
        minLength: 8,
        maxLength: 8,
      },
      '+420': { // Czech Republic
        minLength: 9,
        maxLength: 9,
      },
      '+45': { // Denmark
        minLength: 8,
        maxLength: 8,
      },
      '+253': { // Djibouti
        minLength: 8,
        maxLength: 8,
      },
      '+20': { // Egypt
        minLength: 10,
        maxLength: 10,
      },
      '+503': { // El Salvador
        minLength: 8,
        maxLength: 8,
      },
      '+240': { // Equatorial Guinea
        minLength: 9,
        maxLength: 9,
      },
      '+291': { // Eritrea
        minLength: 7,
        maxLength: 7,
      },
      '+372': { // Estonia
        minLength: 7,
        maxLength: 8,
      },
      '+251': { // Ethiopia
        minLength: 9,
        maxLength: 9,
      },
      '+500': { // Falkland Islands
        minLength: 5,
        maxLength: 5,
      },
      '+298': { // Faroe Islands
        minLength: 6,
        maxLength: 6,
      },
      '+679': { // Fiji
        minLength: 7,
        maxLength: 7,
      },
      '+33': { // France
        minLength: 9,
        maxLength: 9,
      },
      '+594': { // French Guiana
        minLength: 9,
        maxLength: 9,
      },
      '+689': { // French Polynesia
        minLength: 6,
        maxLength: 8,
      },
      '+241': { // Gabon
        minLength: 8,
        maxLength: 8,
      },
      '+220': { // Gambia
        minLength: 7,
        maxLength: 7,
      },
      '+995': { // Georgia
        minLength: 9,
        maxLength: 9,
      },
      '+49': { // Germany
        minLength: 10,
        maxLength: 11,
      },
      '+233': { // Ghana
        minLength: 9,
        maxLength: 9,
      },
      '+350': { // Gibraltar
        minLength: 8,
        maxLength: 8,
      },
      '+30': { // Greece
        minLength: 10,
        maxLength: 10,
      },
      '+299': { // Greenland
        minLength: 6,
        maxLength: 6,
      },
      '+590': { // Guadeloupe
        minLength: 9,
        maxLength: 9,
      },
      '+502': { // Guatemala
        minLength: 8,
        maxLength: 8,
      },
      '+44': { // UK
        minLength: 10,
        maxLength: 10,
      },
      '+224': { // Guinea
        minLength: 8,
        maxLength: 9,
      },
      '+245': { // Guinea-Bissau
        minLength: 7,
        maxLength: 7,
      },
      '+592': { // Guyana
        minLength: 7,
        maxLength: 7,
      },
      '+509': { // Haiti
        minLength: 8,
        maxLength: 8,
      },
      '+504': { // Honduras
        minLength: 8,
        maxLength: 8,
      },
      '+852': { // Hong Kong
        minLength: 8,
        maxLength: 8,
      },
      '+36': { // Hungary
        minLength: 9,
        maxLength: 9,
      },
      '+354': { // Iceland
        minLength: 7,
        maxLength: 9,
      },
      '+91': { // India
        minLength: 10,
        maxLength: 10,
      },
      '+62': { // Indonesia
        minLength: 9,
        maxLength: 12,
      },
      '+98': { // Iran
        minLength: 10,
        maxLength: 10,
      },
      '+964': { // Iraq
        minLength: 10,
        maxLength: 10,
      },
      '+353': { // Ireland
        minLength: 9,
        maxLength: 9,
      },
      '+972': { // Israel
        minLength: 9,
        maxLength: 9,
      },
      '+39': { // Italy
        minLength: 9,
        maxLength: 10,
      },
      '+81': { // Japan
        minLength: 10,
        maxLength: 11,
      },
      '+962': { // Jordan
        minLength: 9,
        maxLength: 9,
      },
      '+7': { // Kazakhstan/Russia
        minLength: 10,
        maxLength: 10,
      },
      '+254': { // Kenya
        minLength: 9,
        maxLength: 9,
      },
      '+686': { // Kiribati
        minLength: 5,
        maxLength: 8,
      },
      '+383': { // Kosovo
        minLength: 8,
        maxLength: 8,
      },
      '+965': { // Kuwait
        minLength: 8,
        maxLength: 8,
      },
      '+996': { // Kyrgyzstan
        minLength: 9,
        maxLength: 9,
      },
      '+856': { // Laos
        minLength: 8,
        maxLength: 10,
      },
      '+371': { // Latvia
        minLength: 8,
        maxLength: 8,
      },
      '+961': { // Lebanon
        minLength: 7,
        maxLength: 8,
      },
      '+266': { // Lesotho
        minLength: 8,
        maxLength: 8,
      },
      '+231': { // Liberia
        minLength: 7,
        maxLength: 8,
      },
      '+218': { // Libya
        minLength: 9,
        maxLength: 9,
      },
      '+423': { // Liechtenstein
        minLength: 7,
        maxLength: 9,
      },
      '+370': { // Lithuania
        minLength: 8,
        maxLength: 8,
      },
      '+352': { // Luxembourg
        minLength: 9,
        maxLength: 9,
      },
      '+853': { // Macau
        minLength: 8,
        maxLength: 8,
      },
      '+261': { // Madagascar
        minLength: 9,
        maxLength: 9,
      },
      '+265': { // Malawi
        minLength: 9,
        maxLength: 9,
      },
      '+60': { // Malaysia
        minLength: 9,
        maxLength: 10,
      },
      '+960': { // Maldives
        minLength: 7,
        maxLength: 7,
      },
      '+223': { // Mali
        minLength: 8,
        maxLength: 8,
      },
      '+356': { // Malta
        minLength: 8,
        maxLength: 8,
      },
      '+692': { // Marshall Islands
        minLength: 7,
        maxLength: 7,
      },
      '+596': { // Martinique
        minLength: 9,
        maxLength: 9,
      },
      '+222': { // Mauritania
        minLength: 8,
        maxLength: 8,
      },
      '+230': { // Mauritius
        minLength: 7,
        maxLength: 8,
      },
      '+262': { // Mayotte
        minLength: 9,
        maxLength: 9,
      },
      '+52': { // Mexico
        minLength: 10,
        maxLength: 10,
      },
      '+691': { // Micronesia
        minLength: 7,
        maxLength: 7,
      },
      '+373': { // Moldova
        minLength: 8,
        maxLength: 8,
      },
      '+377': { // Monaco
        minLength: 8,
        maxLength: 9,
      },
      '+976': { // Mongolia
        minLength: 8,
        maxLength: 8,
      },
      '+382': { // Montenegro
        minLength: 8,
        maxLength: 8,
      },
      '+1664': { // Montserrat
        minLength: 7,
        maxLength: 7,
      },
      '+212': { // Morocco
        minLength: 9,
        maxLength: 9,
      },
      '+95': { // Myanmar
        minLength: 8,
        maxLength: 10,
      },
      '+264': { // Namibia
        minLength: 9,
        maxLength: 9,
      },
      '+674': { // Nauru
        minLength: 7,
        maxLength: 7,
      },
      '+977': { // Nepal
        minLength: 10,
        maxLength: 10,
      },
      '+31': { // Netherlands
        minLength: 9,
        maxLength: 9,
      },
      '+687': { // New Caledonia
        minLength: 6,
        maxLength: 6,
      },
      '+64': { // New Zealand
        minLength: 9,
        maxLength: 10,
      },
      '+505': { // Nicaragua
        minLength: 8,
        maxLength: 8,
      },
      '+227': { // Niger
        minLength: 8,
        maxLength: 8,
      },
      '+234': { // Nigeria
        minLength: 10,
        maxLength: 10,
      },
      '+683': { // Niue
        minLength: 4,
        maxLength: 5,
      },
      '+672': { // Norfolk Island
        minLength: 5,
        maxLength: 6,
      },
      '+850': { // North Korea
        minLength: 10,
        maxLength: 10,
      },
      '+389': { // North Macedonia
        minLength: 8,
        maxLength: 8,
      },
      '+1670': { // Northern Mariana Islands
        minLength: 7,
        maxLength: 7,
      },
      '+47': { // Norway
        minLength: 8,
        maxLength: 8,
      },
      '+968': { // Oman
        minLength: 8,
        maxLength: 8,
      },
      '+92': { // Pakistan
        minLength: 10,
        maxLength: 10,
      },
      '+680': { // Palau
        minLength: 7,
        maxLength: 7,
      },
      '+970': { // Palestine
        minLength: 9,
        maxLength: 9,
      },
      '+507': { // Panama
        minLength: 8,
        maxLength: 8,
      },
      '+675': { // Papua New Guinea
        minLength: 8,
        maxLength: 8,
      },
      '+595': { // Paraguay
        minLength: 9,
        maxLength: 9,
      },
      '+51': { // Peru
        minLength: 9,
        maxLength: 9,
      },
      '+63': { // Philippines
        minLength: 10,
        maxLength: 10,
      },
      '+48': { // Poland
        minLength: 9,
        maxLength: 9,
      },
      '+351': { // Portugal
        minLength: 9,
        maxLength: 9,
      },
      '+1939': { // Puerto Rico
        minLength: 10,
        maxLength: 10,
      },
      '+974': { // Qatar
        minLength: 8,
        maxLength: 8,
      },
      '+40': { // Romania
        minLength: 9,
        maxLength: 9,
      },
      '+250': { // Rwanda
        minLength: 9,
        maxLength: 9,
      },
      '+685': { // Samoa
        minLength: 7,
        maxLength: 7,
      },
      '+378': { // San Marino
        minLength: 10,
        maxLength: 10,
      },
      '+239': { // Sao Tome and Principe
        minLength: 7,
        maxLength: 7,
      },
      '+966': { // Saudi Arabia
        minLength: 9,
        maxLength: 9,
      },
      '+221': { // Senegal
        minLength: 9,
        maxLength: 9,
      },
      '+381': { // Serbia
        minLength: 9,
        maxLength: 9,
      },
      '+248': { // Seychelles
        minLength: 7,
        maxLength: 7,
      },
      '+232': { // Sierra Leone
        minLength: 8,
        maxLength: 8,
      },
      '+65': { // Singapore
        minLength: 8,
        maxLength: 8,
      },
      '+1721': { // Sint Maarten
        minLength: 7,
        maxLength: 7,
      },
      '+421': { // Slovakia
        minLength: 9,
        maxLength: 9,
      },
      '+386': { // Slovenia
        minLength: 8,
        maxLength: 8,
      },
      '+677': { // Solomon Islands
        minLength: 7,
        maxLength: 7,
      },
      '+252': { // Somalia
        minLength: 8,
        maxLength: 8,
      },
      '+27': { // South Africa
        minLength: 9,
        maxLength: 9,
      },
      '+82': { // South Korea
        minLength: 9,
        maxLength: 10,
      },
      '+211': { // South Sudan
        minLength: 9,
        maxLength: 9,
      },
      '+34': { // Spain
        minLength: 9,
        maxLength: 9,
      },
      '+94': { // Sri Lanka
        minLength: 9,
        maxLength: 9,
      },
      '+249': { // Sudan
        minLength: 9,
        maxLength: 9,
      },
      '+597': { // Suriname
        minLength: 7,
        maxLength: 7,
      },
      '+46': { // Sweden
        minLength: 7,
        maxLength: 9,
      },
      '+41': { // Switzerland
        minLength: 9,
        maxLength: 9,
      },
      '+963': { // Syria
        minLength: 9,
        maxLength: 9,
      },
      '+886': { // Taiwan
        minLength: 9,
        maxLength: 9,
      },
      '+992': { // Tajikistan
        minLength: 9,
        maxLength: 9,
      },
      '+255': { // Tanzania
        minLength: 9,
        maxLength: 9,
      },
      '+66': { // Thailand
        minLength: 9,
        maxLength: 9,
      },
      '+670': { // Timor-Leste
        minLength: 7,
        maxLength: 8,
      },
      '+228': { // Togo
        minLength: 8,
        maxLength: 8,
      },
      '+690': { // Tokelau
        minLength: 4,
        maxLength: 5,
      },
      '+676': { // Tonga
        minLength: 5,
        maxLength: 7,
      },
      '+1868': { // Trinidad & Tobago
        minLength: 7,
        maxLength: 7,
      },
      '+216': { // Tunisia
        minLength: 8,
        maxLength: 8,
      },
      '+90': { // Turkey
        minLength: 10,
        maxLength: 10,
      },
      '+993': { // Turkmenistan
        minLength: 8,
        maxLength: 8,
      },
      '+1649': { // Turks & Caicos Islands
        minLength: 7,
        maxLength: 7,
      },
      '+688': { // Tuvalu
        minLength: 5,
        maxLength: 6,
      },
      '+256': { // Uganda
        minLength: 9,
        maxLength: 9,
      },
      '+380': { // Ukraine
        minLength: 9,
        maxLength: 9,
      },
      '+598': { // Uruguay
        minLength: 8,
        maxLength: 8,
      },
      '+998': { // Uzbekistan
        minLength: 9,
        maxLength: 9,
      },
      '+678': { // Vanuatu
        minLength: 7,
        maxLength: 7,
      },
      '+58': { // Venezuela
        minLength: 10,
        maxLength: 10,
      },
      '+84': { // Vietnam
        minLength: 9,
        maxLength: 10,
      },
      '+681': { // Wallis & Futuna
        minLength: 6,
        maxLength: 6,
      },
      '+967': { // Yemen
        minLength: 9,
        maxLength: 9,
      },
      '+260': { // Zambia
        minLength: 9,
        maxLength: 9,
      },
      '+263': { // Zimbabwe
        minLength: 9,
        maxLength: 9,
      }
    };
  };
  
  // Generate the rules
  const countryRules = generateCountryRules();

 export const validatePhoneNumber = (phoneCode, phoneNumber) => {
    // Remove all non-digit characters
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    
    // Get the rule for the current phone code or use default
    const rule = countryRules[phoneCode] || {
      minLength: 6,
      maxLength: 15,
    };
  
    let formattedPhone = cleanedPhone;
    
    // Apply country-specific formatting
    if (rule.removeLeadingZero && cleanedPhone.startsWith('0')) {
      formattedPhone = cleanedPhone.substring(1);
    }
  
    // Validate length
    if (formattedPhone.length < rule.minLength) {
      return {
        isValid: false,
        formattedPhone: formattedPhone,
        error: `Phone number too short (min ${rule.minLength} digits)`,
      };
    }
  
    if (formattedPhone.length > rule.maxLength) {
      return {
        isValid: false,
        formattedPhone: formattedPhone,
        error: `Phone number too long (max ${rule.maxLength} digits)`,
      };
    }
  
    return {
      isValid: true,
      formattedPhone: formattedPhone,
      error: null,
    };
  };
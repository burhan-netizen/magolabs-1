export type Language = 'en' | 'hi' | 'gu';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.services.all': 'All Services Overview',
    'nav.services.web': 'Website Design & Dev',
    'nav.services.seo': 'SEO Optimization',
    'nav.services.gbp': 'Google Business Profile',
    'nav.services.copywriting': 'Copywriting',
    'nav.whyChooseUs': 'Why Choose Us',
    'nav.portfolio': 'Portfolio',
    'nav.work': 'Work',
    'nav.process': 'Process',
    'nav.testimonials': 'Testimonials',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    'nav.cta': 'Get My Website Reviewed',
    'nav.theme.light': 'Light Mode',
    'nav.theme.dark': 'Night-Owl Mode',

    // Sticky / Footer / CTAs
    'cta.title': 'Think Your Website Could Be Doing More?',
    'cta.desc': 'Get a practical review of your website and see where you’re losing trust, visibility, or enquiries.',
    'cta.btn': 'Get My Website Reviewed',
    'cta.whatsapp': 'Chat on WhatsApp',
    'cta.call': 'Call Burhan Kapasi',
    'cta.nowebsite': 'No website yet? Let\'s talk',

    // Home Page Hero
    'hero.badge': 'High-Performance Web Engineering for Growth',
    'hero.title': 'Your Website Should Bring You Business. Not Just Look Good.',
    'hero.desc': 'Custom websites designed to build trust, improve visibility, and turn visitors into enquiries.',
    'hero.cta.primary': 'Get My Website Reviewed',
    'hero.cta.secondary': 'See Our Work',
    'hero.reassurance': 'Free website review. No sales pitch.',

    // Hero trust indicators
    'hero.trust.custom': 'Custom Design (No Templates)',
    'hero.trust.mobile': 'Mobile First Responsive',
    'hero.trust.fast': 'Lightning-Fast Load Speeds',
    'hero.trust.seo': 'In-built SEO Architecture',
    
    // Home Page Services Header
    'home.services.badge': 'Our Services',
    'home.services.title': 'Core Capabilities Engineered for ROI',
    'home.services.desc': 'Your website is the foundation. SEO, Google Business Profile, and copywriting are the growth layer we build on top of it.',
    
    // Common / General
    'common.soon': 'Soon'
  },
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.services.all': 'सभी सेवाओं का विवरण',
    'nav.services.web': 'वेबसाइट डिज़ाइन और देव',
    'nav.services.seo': 'एसईओ (SEO) अनुकूलन',
    'nav.services.gbp': 'गूगल बिजनेस प्रोफाइल',
    'nav.services.copywriting': 'कॉपीराइटिंग',
    'nav.whyChooseUs': 'हमें क्यों चुनें',
    'nav.portfolio': 'पोर्टफोलियो',
    'nav.work': 'हमारा काम',
    'nav.process': 'प्रक्रिया',
    'nav.testimonials': 'सफलता की कहानियां',
    'nav.insights': 'ब्लॉग',
    'nav.contact': 'संपर्क करें',
    'nav.cta': 'मेरी वेबसाइट की समीक्षा करवाएं',
    'nav.theme.light': 'लाइट मोड',
    'nav.theme.dark': 'नाईट-आउल मोड',

    // Sticky / Footer / CTAs
    'cta.title': 'लगता है आपकी वेबसाइट और बेहतर कर सकती है?',
    'cta.desc': 'अपनी वेबसाइट की व्यावहारिक समीक्षा करवाएं और देखें कि आप कहां भरोसा, विज़िबिलिटी या पूछताछ खो रहे हैं।',
    'cta.btn': 'मेरी वेबसाइट की समीक्षा करवाएं',
    'cta.whatsapp': 'व्हाट्सएप पर चैट करें',
    'cta.call': 'बुर्हान कपासी को कॉल करें',
    'cta.nowebsite': 'अभी वेबसाइट नहीं है? चलिए बात करते हैं',

    // Home Page Hero
    'hero.badge': 'व्यवसायिक विकास के लिए उच्च-प्रदर्शन वेब इंजीनियरिंग',
    'hero.title': 'आपकी वेबसाइट को आपके लिए व्यवसाय लाना चाहिए, सिर्फ दिखने में अच्छा नहीं होना चाहिए।',
    'hero.desc': 'ऐसी कस्टम वेबसाइटें जो भरोसा बनाएं, आपकी विज़िबिलिटी बढ़ाएं, और विज़िटर्स को पूछताछ में बदलें।',
    'hero.cta.primary': 'मेरी वेबसाइट की समीक्षा करवाएं',
    'hero.cta.secondary': 'हमारा काम देखें',
    'hero.reassurance': 'मुफ़्त वेबसाइट समीक्षा। कोई सेल्स पिच नहीं।',

    // Hero trust indicators
    'hero.trust.custom': 'कस्टम डिज़ाइन (कोई टेम्पलेट नहीं)',
    'hero.trust.mobile': 'मोबाइल फर्स्ट रिस्पॉन्सिव',
    'hero.trust.fast': 'बिजली की तरह तेज़ लोड स्पीड',
    'hero.trust.seo': 'इन-बिल्ट एसईओ आर्किटेक्चर',
    
    // Home Page Services Header
    'home.services.badge': 'हमारी सेवाएं',
    'home.services.title': 'वास्तविक विकास (ROI) के लिए निर्मित मुख्य सेवाएं',
    'home.services.desc': 'आपकी वेबसाइट नींव है। SEO, गूगल बिज़नेस प्रोफाइल और कॉपीराइटिंग वह ग्रोथ लेयर है जो हम उसके ऊपर बनाते हैं।',
    
    // Common / General
    'common.soon': 'जल्द ही'
  },
  gu: {
    // Navbar
    'nav.home': 'હોમ',
    'nav.about': 'અમારા વિશે',
    'nav.services': 'સેવાઓ',
    'nav.services.all': 'બધી સેવાઓનું વિવરણ',
    'nav.services.web': 'વેબસાઇટ ડિઝાઇન અને ડેવલપમેન્ટ',
    'nav.services.seo': 'એસઇઓ (SEO) ઓપ્ટિમાઇઝેશન',
    'nav.services.gbp': 'ગૂગલ બિઝનેસ પ્રોફાઇલ',
    'nav.services.copywriting': 'કોપીરાઇટીંગ',
    'nav.whyChooseUs': 'શા માટે અમને પસંદ કરો',
    'nav.portfolio': 'પોર્ટફોલિયો',
    'nav.work': 'અમારું કામ',
    'nav.process': 'પ્રક્રિયા',
    'nav.testimonials': 'પ્રશંસાપત્રો',
    'nav.insights': 'માહિતી બ્લોગ',
    'nav.contact': 'સંપર્ક કરો',
    'nav.cta': 'મારી વેબસાઇટની સમીક્ષા કરાવો',
    'nav.theme.light': 'લાઇટ મોડ',
    'nav.theme.dark': 'નાઇટ-આઉલ મોડ',

    // Sticky / Footer / CTAs
    'cta.title': 'લાગે છે તમારી વેબસાઇટ વધુ સારું કરી શકે છે?',
    'cta.desc': 'તમારી વેબસાઇટની વ્યવહારુ સમીક્ષા મેળવો અને જુઓ કે તમે ક્યાં વિશ્વાસ, વિઝિબિલિટી અથવા પૂછપરછ ગુમાવી રહ્યા છો.',
    'cta.btn': 'મારી વેબસાઇટની સમીક્ષા કરાવો',
    'cta.whatsapp': 'વોટ્સએપ પર ચેટ કરો',
    'cta.call': 'બુરહાન કપાસીને કોલ કરો',
    'cta.nowebsite': 'હજુ વેબસાઇટ નથી? ચાલો વાત કરીએ',

    // Home Page Hero
    'hero.badge': 'ધંધાકીય વૃદ્ધિ માટે હાઇ-પરફોર્મન્સ વેબ એન્જિનિયરિંગ',
    'hero.title': 'તમારી વેબસાઇટે તમારા માટે બિઝનેસ લાવવો જોઈએ, ફક્ત સારી દેખાવી ન જોઈએ.',
    'hero.desc': 'એવી કસ્ટમ વેબસાઇટ્સ જે વિશ્વાસ બનાવે, તમારી વિઝિબિલિટી વધારે, અને મુલાકાતીઓને પૂછપરછમાં ફેરવે.',
    'hero.cta.primary': 'મારી વેબસાઇટની સમીક્ષા કરાવો',
    'hero.cta.secondary': 'અમારું કામ જુઓ',
    'hero.reassurance': 'મફત વેબસાઇટ સમીક્ષા. કોઈ સેલ્સ પિચ નહીં.',

    // Hero trust indicators
    'hero.trust.custom': 'કસ્ટમ ડિઝાઇન (કોઈ ટેમ્પલેટ નહીં)',
    'hero.trust.mobile': 'મોબાઇલ ફર્સ્ટ રિસ્પોન્સિવ',
    'hero.trust.fast': 'વીજળી જેવી ઝડપી લોડ સ્પીડ',
    'hero.trust.seo': 'ઇન-બિલ્ટ એસઇઓ આર્કિટેક્ચર',
    
    // Home Page Services Header
    'home.services.badge': 'અમારી સેવાઓ',
    'home.services.title': 'વ્યવસાયિક પ્રગતિ (ROI) માટે ખાસ ક્ષમતાઓ',
    'home.services.desc': 'તમારી વેબસાઇટ પાયો છે. SEO, ગૂગલ બિઝનેસ પ્રોફાઇલ અને કોપીરાઇટીંગ એ ગ્રોથ લેયર છે જે અમે તેની ઉપર બનાવીએ છીએ.',
    
    // Common / General
    'common.soon': 'ટૂંક સમયમાં'
  }
};

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
    'nav.testimonials': 'Testimonials',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    'nav.cta': 'Discuss Your Project',
    'nav.theme.light': 'Light Mode',
    'nav.theme.dark': 'Night-Owl Mode',
    
    // Sticky / Footer / CTAs
    'cta.title': 'Ready for a website that actually works for your business?',
    'cta.desc': 'Tell us what you’re trying to achieve. We’ll show you what a better digital presence could look like.',
    'cta.btn': 'Discuss Your Project',
    'cta.whatsapp': 'Chat on WhatsApp',
    'cta.call': 'Call Burhan Kapasi',

    // Home Page Hero
    'hero.badge': 'High-Performance Web Engineering for Growth',
    'hero.title': 'Websites That Turn Visitors Into Customers',
    'hero.desc': 'Custom-designed, mobile-optimized, SEO-ready, and built purely for conversions. We build websites that represent your brand well and turn visitors into real enquiries. No templates, no bloated page builders.',
    'hero.cta.primary': 'Discuss Your Project',
    'hero.cta.secondary': 'See Our Work',

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
    'nav.testimonials': 'सफलता की कहानियां',
    'nav.insights': 'ब्लॉग',
    'nav.contact': 'संपर्क करें',
    'nav.cta': 'अपना प्रोजेक्ट चर्चा करें',
    'nav.theme.light': 'लाइट मोड',
    'nav.theme.dark': 'नाईट-आउल मोड',

    // Sticky / Footer / CTAs
    'cta.title': 'क्या आप ऐसी वेबसाइट चाहते हैं जो सच में आपके व्यवसाय के लिए काम करे?',
    'cta.desc': 'हमें बताएं कि आप क्या हासिल करना चाहते हैं। हम आपको दिखाएंगे कि एक बेहतर डिजिटल उपस्थिति कैसी दिख सकती है।',
    'cta.btn': 'अपना प्रोजेक्ट चर्चा करें',
    'cta.whatsapp': 'व्हाट्सएप पर चैट करें',
    'cta.call': 'बुर्हान कपासी को कॉल करें',

    // Home Page Hero
    'hero.badge': 'व्यवसायिक विकास के लिए उच्च-प्रदर्शन वेब इंजीनियरिंग',
    'hero.title': 'ऐसी वेबसाइटें जो विज़िटर्स को ग्राहकों में बदलें',
    'hero.desc': 'कस्टम-डिज़ाइन की गई, मोबाइल-अनुकूलित (Responsive), एसईओ (SEO)-रेडी और शुद्ध रूप से कन्वर्शन-केंद्रित वेबसाइटें। हम ऐसी वेबसाइटें बनाते हैं जो आपके ब्रांड को अच्छी तरह प्रस्तुत करती हैं और विज़िटर्स को असली पूछताछ (enquiries) में बदलती हैं। कोई टेम्पलेट नहीं, कोई धीमा पेज बिल्डर नहीं।',
    'hero.cta.primary': 'अपना प्रोजेक्ट चर्चा करें',
    'hero.cta.secondary': 'हमारा काम देखें',

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
    'nav.testimonials': 'પ્રશંસાપત્રો',
    'nav.insights': 'માહિતી બ્લોગ',
    'nav.contact': 'સંપર્ક કરો',
    'nav.cta': 'તમારો પ્રોજેક્ટ ચર્ચા કરો',
    'nav.theme.light': 'લાઇટ મોડ',
    'nav.theme.dark': 'નાઇટ-આઉલ મોડ',

    // Sticky / Footer / CTAs
    'cta.title': 'શું તમને એવી વેબસાઇટ જોઈએ છે જે ખરેખર તમારા બિઝનેસ માટે કામ કરે?',
    'cta.desc': 'અમને જણાવો કે તમે શું હાંસલ કરવા માંગો છો. અમે તમને બતાવીશું કે એક વધુ સારી ડિજિટલ હાજરી કેવી દેખાઈ શકે.',
    'cta.btn': 'તમારો પ્રોજેક્ટ ચર્ચા કરો',
    'cta.whatsapp': 'વોટ્સએપ પર ચેટ કરો',
    'cta.call': 'બુરહાન કપાસીને કોલ કરો',

    // Home Page Hero
    'hero.badge': 'ધંધાકીય વૃદ્ધિ માટે હાઇ-પરફોર્મન્સ વેબ એન્જિનિયરિંગ',
    'hero.title': 'એવી વેબસાઇટ્સ જે મુલાકાતીઓને ગ્રાહકોમાં ફેરવે',
    'hero.desc': 'કસ્ટમ-ડિઝાઇન કરેલી, મોબાઇલ-ઓપ્ટિમાઇઝ્ડ, એસઇઓ (SEO)-ફ્રેન્ડલી અને સંપૂર્ણપણે કન્વર્ઝન-કેન્દ્રિત વેબસાઇટ્સ. અમે એવી વેબસાઇટ્સ બનાવીએ છીએ જે તમારા બ્રાન્ડને સારી રીતે રજૂ કરે છે અને મુલાકાતીઓને સાચી પૂછપરછ (enquiries)માં ફેરવે છે. કોઈ ટેમ્પલેટ નહીં, કોઈ ધીમા પેજ બિલ્ડર્સ નહીં.',
    'hero.cta.primary': 'તમારો પ્રોજેક્ટ ચર્ચા કરો',
    'hero.cta.secondary': 'અમારું કામ જુઓ',

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

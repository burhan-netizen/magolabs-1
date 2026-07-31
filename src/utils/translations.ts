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
    'nav.cta': 'Book Discovery Call',
    'nav.theme.light': 'Light Mode',
    'nav.theme.dark': 'Night-Owl Mode',
    
    // Sticky / Footer / CTAs
    'cta.title': 'Ready to Grow Your Business & Generate More Enquiries?',
    'cta.desc': 'Let’s build a high-converting, lightning-fast custom website designed around your ideal customers. Claim your free 30-minute local search visibility and speed audit today.',
    'cta.btn': 'Book Your Free Consultation',
    'cta.whatsapp': 'Chat on WhatsApp',
    'cta.call': 'Call Burhan Kapasi',
    
    // Home Page Hero
    'hero.badge': 'High-Performance Web Engineering for Growth',
    'hero.title': 'Websites That Turn Visitors Into Customers',
    'hero.desc': 'Custom-designed, mobile-optimized, SEO-ready, lightning-fast, and built purely for conversions. We code bespoke business websites that represent your brand with absolute authority and capture actual client enquiries. No templates, no bloated page builders.',
    'hero.cta.primary': 'Book Free Consultation',
    'hero.cta.secondary': 'View Services',
    
    // Hero trust indicators
    'hero.trust.custom': 'Custom Design (No Templates)',
    'hero.trust.mobile': 'Mobile First Responsive',
    'hero.trust.fast': 'Lightning-Fast Speeds (90+ score)',
    'hero.trust.seo': 'In-built SEO Architecture',
    
    // Home Page Services Header
    'home.services.badge': 'Our Services',
    'home.services.title': 'Core Capabilities Engineered for ROI',
    'home.services.desc': 'We focus exclusively on the channels that drive growth. We do not upsell fancy features you do not need, only what will bring customers to your door.',
    
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
    'nav.cta': 'डिस्कवरी कॉल बुक करें',
    'nav.theme.light': 'लाइट मोड',
    'nav.theme.dark': 'नाईट-आउल मोड',
    
    // Sticky / Footer / CTAs
    'cta.title': 'क्या आप अपना व्यवसाय बढ़ाने और अधिक ग्राहक आकर्षित करने के लिए तैयार हैं?',
    'cta.desc': 'आइए आपके आदर्श ग्राहकों के लिए एक उच्च-परिवर्तित (high-converting), बिजली की तरह तेज़ कस्टम वेबसाइट तैयार करें। आज ही अपना मुफ़्त 30-मिनट का स्थानीय खोज और स्पीड ऑडिट बुक करें।',
    'cta.btn': 'मुफ़्त परामर्श बुक करें',
    'cta.whatsapp': 'व्हाट्सएप पर चैट करें',
    'cta.call': 'बुर्हान कपासी को कॉल करें',
    
    // Home Page Hero
    'hero.badge': 'व्यवसायिक विकास के लिए उच्च-प्रदर्शन वेब इंजीनियरिंग',
    'hero.title': 'ऐसी वेबसाइटें जो विज़िटर्स को ग्राहकों में बदलें',
    'hero.desc': 'कस्टम-डिज़ाइन की गई, मोबाइल-अनुकूलित (Responsive), एसईओ (SEO)-रेडी, बिजली की तरह तेज़ और शुद्ध रूप से कन्वर्शन-केंद्रित वेबसाइटें। हम ऐसी कस्टम वेबसाइटों का निर्माण करते हैं जो आपके ब्रांड को पूरी प्रामाणिकता के साथ प्रस्तुत करती हैं और सीधे ग्राहकों से पूछताछ (Inquiries) लाती हैं। कोई टेम्पलेट नहीं, कोई धीमा पेज बिल्डर नहीं।',
    'hero.cta.primary': 'मुफ़्त परामर्श बुक करें',
    'hero.cta.secondary': 'हमारी सेवाएं',
    
    // Hero trust indicators
    'hero.trust.custom': 'कस्टम डिज़ाइन (कोई टेम्पलेट नहीं)',
    'hero.trust.mobile': 'मोबाइल फर्स्ट रिस्पॉन्सिव',
    'hero.trust.fast': 'बिजली की तरह तेज़ स्पीड (90+ स्कोर)',
    'hero.trust.seo': 'इन-बिल्ट एसईओ आर्किटेक्चर',
    
    // Home Page Services Header
    'home.services.badge': 'हमारी सेवाएं',
    'home.services.title': 'वास्तविक विकास (ROI) के लिए निर्मित मुख्य सेवाएं',
    'home.services.desc': 'हम विशेष रूप से उन चैनलों पर ध्यान केंद्रित करते हैं जो व्यवसाय के विकास को बढ़ावा देते हैं। हम ऐसी अनावश्यक सुविधाओं को बढ़ावा नहीं देते जिनकी आपको आवश्यकता नहीं है, केवल वही जो ग्राहकों को आपके पास लाए।',
    
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
    'nav.cta': 'ડિસ્કવરી કોલ બુક કરો',
    'nav.theme.light': 'લાઇટ મોડ',
    'nav.theme.dark': 'નાઇટ-આઉલ મોડ',
    
    // Sticky / Footer / CTAs
    'cta.title': 'શું તમે તમારો બિઝનેસ વધારવા અને વધુ ગ્રાહકો આકર્ષવા માટે તૈયાર છો?',
    'cta.desc': 'ચાલો તમારા ગ્રાહકોને ધ્યાનમાં રાખીને એક વીજળી જેવી ઝડપી અને કન્વર્ઝન-કેન્દ્રિત વેબસાઇટ બનાવીએ. આજે જ તમારું મફત સ્પીડ અને લોકલ સર્ચ ઓડિટ મેળવો.',
    'cta.btn': 'મફત પરામર્શ બુક કરો',
    'cta.whatsapp': 'વોટ્સએપ પર ચેટ કરો',
    'cta.call': 'બુરહાન કપાસીને કોલ કરો',
    
    // Home Page Hero
    'hero.badge': 'ધંધાકીય વૃદ્ધિ માટે હાઇ-પરફોર્મન્સ વેબ એન્જિનિયરિંગ',
    'hero.title': 'એવી વેબસાઇટ્સ જે મુલાકાતીઓને ગ્રાહકોમાં ફેરવે',
    'hero.desc': 'કસ્ટમ-ડિઝાઇન કરેલી, મોબાઇલ-ઓપ્ટિમાઇઝ્ડ, એસઇઓ (SEO)-ફ્રેન્ડલી, અત્યન્ટ ઝડપી અને સંપૂર્ણપણે કન્વર્ઝન-કેન્દ્રિત વેબસાઇટ્સ. અમે એવી કસ્ટમ વેબસાઇટ્સ બનાવીએ છીએ જે તમારા બ્રાન્ડની પ્રતિષ્ઠા વધારે છે અને વાસ્તવિક ગ્રાહકોની પૂછપરછ (Enquiries) લાવે છે. કોઈ ટેમ્પલેટ નહીં, કોઈ ધીમા પેજ બિલ્ડર્સ નહીં.',
    'hero.cta.primary': 'મફત પરામર્શ બુક કરો',
    'hero.cta.secondary': 'અમારી સેવાઓ',
    
    // Hero trust indicators
    'hero.trust.custom': 'કસ્ટમ ડિઝાઇન (કોઈ ટેમ્પલેટ નહીં)',
    'hero.trust.mobile': 'મોબાઇલ ફર્સ્ટ રિસ્પોન્સિવ',
    'hero.trust.fast': 'વીજળી જેવી સ્પીડ (૯૦+ સ્કોર)',
    'hero.trust.seo': 'ઇન-બિલ્ટ એસઇઓ આર્કિટેક્ચર',
    
    // Home Page Services Header
    'home.services.badge': 'અમારી સેવાઓ',
    'home.services.title': 'વ્યવસાયિક પ્રગતિ (ROI) માટે ખાસ ક્ષમતાઓ',
    'home.services.desc': 'અમે ફક્ત એવા રસ્તાઓ પર ધ્યાન કેન્દ્રિત કરીએ છીએ જે બિઝનેસનો ગ્રોથ વધારે છે. અમે વધારાની બિનજરૂરી વસ્તુઓ આપવા પ્રયત્ન નથી કરતા, માત્ર એ જ જે ગ્રાહકોને તમારા સુધી લાવે.',
    
    // Common / General
    'common.soon': 'ટૂંક સમયમાં'
  }
};

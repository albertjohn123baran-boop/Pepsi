import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductShowcase } from "./components/ProductShowcase";
import { SocialProofAndCTA } from "./components/SocialProofAndCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-pepsi-black text-white selection:bg-pepsi-red selection:text-white">
      {/* Mock Analytics Head Scripts for requirement 7 */}
      <div className="hidden" aria-hidden="true" id="tracking-scripts">
        {`
        <!-- Meta Pixel Code -->
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'MOCK_PIXEL_ID');
        fbq('track', 'PageView');
        </script>
        `}
      </div>

      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <SocialProofAndCTA />
      </main>
    </div>
  );
}

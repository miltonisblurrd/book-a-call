---
title: "Safe Faces Case Study | Brand, iOS App & Privacy-First Product"
description: "How BLURRD built Safe Faces from brand strategy through native iOS development—a privacy-first app that helps parents share childhood memories without exposing children's identities."
client: "Safe Faces"
ogImage: "/images/Group-47654-1.jpg"
caseStudy:
  eyebrow: "Safe Faces · Privacy-First iOS App"
  headline: "Protecting childhood memories without exposing children's identities."
  summary: "Safe Faces is a privacy-first iOS app for parents, families, educators, and youth organizations. It helps people safely share photos and videos by detecting and covering children's faces before content leaves their device—without accounts, cloud uploads, or third-party processing."
  industry: "Consumer privacy & family technology"
  engagement: "Brand, website, product experience, messaging, and technical positioning"
  role: "End-to-end brand and product partner"
  services:
    - "Brand strategy and visual identity"
    - "Product positioning and messaging"
    - "UX and interaction design"
    - "Native iOS development"
    - "Privacy-focused engineering"
    - "Video processing architecture"
    - "TestFlight distribution"
    - "Next.js landing page and conversion funnel"
  challengeTitle: "Solve more than face blurring—build trust."
  challenge: "Children appear in photos and videos every day, but they cannot control where those images go. Parents face inconvenient options: avoid sharing, manually cover every face, upload to unfamiliar cloud services, or trust detection without knowing if someone was missed. Safe Faces needed to protect children without making parents feel judged—while supporting photos, video, on-device processing, and a credible brand around a sensitive subject."
  approachTitle: "Start with the parent, not the technology."
  approach: "The product was positioned around one idea: Post the memory. Not their face. A warm, trustworthy brand balances protection with childhood warmth. Privacy is designed into the default experience—faces covered by default, parents in control—and the technical architecture supports the promise with on-device processing, metadata removal, and fail-closed export validation."
  outcomes:
    - "A distinct parent-focused privacy brand with comprehensive messaging and guidelines."
    - "A native iPhone and iPad app with photo and video face-covering workflows."
    - "A custom on-device video face-tracking pipeline with export safety validation."
    - "Six documented product iterations from version 1.0 through 1.6."
    - "Open TestFlight beta with a conversion-focused landing page and acquisition funnel."
    - "A unified visual system across app, website, and brand materials."
  deliverables:
    - "Brand strategy, logo, app icon, and brand guidelines"
    - "Color, typography, voice, tone, and privacy claim standards"
    - "Product requirements and blur-by-default UX model"
    - "Native SwiftUI iOS application"
    - "In-app camera, metadata removal, and export validation"
    - "Reliability tests for face tracking and export behavior"
    - "Responsive Next.js landing page with interactive demo"
    - "TestFlight preparation and beta release"
  resultSummary: "Safe Faces progressed from an initial idea into a complete, testable product ecosystem—where brand promise, interface, engineering, and marketing all support one goal: helping adults share childhood moments more responsibly."
  ctaHeadline: "Building a Product That Needs Trust?"
---

<section class="section u-p-40-hero">
        <div class="container">
          <p class="text-paragraph u-extra-bold margin-19">Our Involvement:</p>
          <p class="text-paragraph u-text-gray">Safe Faces is a privacy-first iOS app created for parents, families, educators, and youth organizations. It helps people safely share photos and videos by detecting and covering children's faces before content leaves their device.</p>
          <p class="text-paragraph u-text-gray u-mt-2">The engagement covered the complete product journey—from brand strategy and visual identity to product design, native iOS development, TestFlight distribution, and a conversion-focused landing page. Status: open beta on TestFlight. Platforms: iPhone and iPad.</p>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">The Problem</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">Parents should not have to choose between sharing and protecting</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">Children appear in photos and videos every day, but they cannot fully control where those images go, who saves them, or how they may be used later. For parents, the existing options are usually inconvenient or incomplete.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Avoid sharing meaningful family moments entirely. Manually cover every face using a general photo editor. Upload sensitive media to an unfamiliar cloud service. Trust automatic detection without knowing whether it missed someone. Share group photos involving children whose families have different privacy preferences.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Safe Faces needed to solve more than face blurring. It needed to create trust—a product that could protect children without making parents feel judged, make privacy understandable without technical jargon, support both photos and video, keep sensitive media on-device, and turn that story into a clear TestFlight acquisition experience.</p>
            </div>
            <figure class="case-study-visual">
              <div class="case-study-image-placeholder" role="img" aria-label="Screenshot placeholder: Problem framing">Screenshot: Problem framing — parent dilemma between sharing memories and protecting children's identities</div>
              <figcaption><span>01</span><strong>The parent dilemma</strong> — Existing options force a tradeoff between sharing meaningful moments and protecting a child's identity.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">Brand &amp; Positioning</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">Post the memory. Not their face.</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">The product was positioned around a simple idea: give parents a practical way to protect children until they are old enough to make their own choices about their online identity. The messaging avoids fear-based marketing and does not lead with "AI."</p>
              <p class="text-paragraph u-text-gray u-mt-2">The Safe Faces identity balances protection with childhood warmth. A rounded logo, soft cream backgrounds, approachable typography, and a blue-led color system help the product feel supportive rather than clinical. The logo represents a face that remains present in the memory but is no longer identifiable.</p>
              <p class="text-paragraph u-text-gray u-mt-2">A complete brand framework established logo usage and lockups, color and accessibility standards, typography, voice and tone, messaging principles, privacy claim guidelines, interface language, and illustration and photography direction.</p>
            </div>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/02-brand-system.jpg" loading="lazy" alt="Safe Faces brand system — logo, color, and typography" class="image-one-window">
              <figcaption><span>02</span><strong>Brand system</strong> — Logo, color, and typography built to feel warm and approachable—not technical or alarming.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/03-app-icon-mark.jpg" loading="lazy" alt="Safe Faces brand guidelines — logo lockups, color, voice, and privacy claims" class="image-one-window">
              <figcaption><span>03</span><strong>Brand guidelines</strong> — A complete framework covering messaging, accessibility, interface language, and approved privacy claims.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/04-logo-app-icon.jpg" loading="lazy" alt="Safe Faces logo and app icon — rounded face mark" class="image-one-window">
              <figcaption><span>04</span><strong>Logo &amp; app icon</strong> — The mark signals protection while keeping childhood warmth at the center of the identity.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">Product Design</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">Privacy designed into the default experience</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">Safe Faces begins from the safest state: detected faces are covered by default. Parents can then review the image or video and intentionally decide which faces may remain visible. Blue indicators communicate covered faces; red indicators draw attention to exposed ones.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Manual regions provide a backup when automatic detection needs help—keeping the parent in control without making every edit a manual process. The workflow supports photo import, in-app photo and video capture, selective face covering, multiple blur treatments, and export ready to share.</p>
              <p class="text-paragraph u-text-gray u-mt-2">The experience was designed to feel warm and approachable—not technical, alarming, or judgmental. Privacy is communicated through clear language and reinforced by the product itself.</p>
            </div>
            <figure class="case-study-visual">
              <div class="case-study-image-placeholder" role="img" aria-label="Screenshot placeholder: Photo editing workflow">Screenshot: Photo workflow — blur-by-default with blue covered and red exposed face indicators</div>
              <figcaption><span>05</span><strong>Blur-by-default model</strong> — Detected faces start covered. Parents review and intentionally choose which faces may remain visible.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <div class="case-study-image-placeholder" role="img" aria-label="Screenshot placeholder: Video editing interface">Screenshot: Video editing — face tracking preview with manual coverage regions</div>
              <figcaption><span>06</span><strong>Video workflow</strong> — Face selection, manual regions, and preview controls for the harder problem of moving video.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/07-in-app-camera.jpg" loading="lazy" alt="Safe Faces in-app camera for photo and video capture" class="image-one-window">
              <figcaption><span>07</span><strong>In-app camera</strong> — Capture photos and videos directly in Safe Faces without leaving the privacy-first workflow.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/08-interface-system.jpg" loading="lazy" alt="Safe Faces interface system across editor, controls, and settings" class="image-one-window">
              <figcaption><span>08</span><strong>Interface system</strong> — Consistent patterns across editor navigation, controls, settings, and privacy communication.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">iOS Engineering</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">On-device processing that supports the promise</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">The iOS app was built natively using SwiftUI, Apple Vision, AVFoundation, and Core Image. Face detection, tracking, and rendering happen on-device. The app does not require accounts, analytics, cloud uploads, or third-party processing SDKs.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Video required a custom tracking and rendering pipeline to maintain face coverage across movement, temporary obstruction, orientation changes, and long exports. The same face-tracking information is used for preview, playback, validation, and final export—reducing differences between what the parent reviews and what gets saved.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Before video export, Safe Faces checks coverage across the timeline. If the result appears unsafe, the app blocks the export instead of silently producing a file with uncovered frames. Metadata is removed during export. Reliability tests cover face tracking and export behavior across six documented iterations from version 1.0 through 1.6.</p>
            </div>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/09-privacy-architecture.jpg" loading="lazy" alt="Safe Faces privacy architecture — on-device processing without cloud uploads" class="image-one-window">
              <figcaption><span>09</span><strong>Privacy architecture</strong> — Processing stays on-device. No accounts, analytics, or third-party SDKs required.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <div class="case-study-image-placeholder" role="img" aria-label="Screenshot placeholder: Video export validation">Screenshot: Export validation — fail-closed safety check blocking unsafe video exports</div>
              <figcaption><span>10</span><strong>Fail-closed export</strong> — If coverage does not meet safety requirements, the app stops export rather than silently saving an unsafe file.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/11-iphone-ipad.jpg" loading="lazy" alt="Safe Faces native SwiftUI app on iPhone and iPad" class="image-one-window">
              <figcaption><span>11</span><strong>iPhone &amp; iPad</strong> — Native SwiftUI application built for both phone and tablet use cases.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">Landing Page &amp; TestFlight Launch</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">An extension of the app—not a separate marketing layer</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">The landing page was designed as an extension of the app. It explains the problem, demonstrates the interaction, communicates the privacy model, answers common parent questions, and directs qualified users into the TestFlight beta.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Built with Next.js, the site includes an interactive product demonstration, parent-focused educational content, privacy and trust sections, FAQ framework, SEO metadata, and a TestFlight acquisition funnel. Illustrated characters were used in the interactive demo so the product could be explained without using real children's faces as marketing material.</p>
              <p class="text-paragraph u-text-gray u-mt-2">Safe Faces remains in beta, so the outcome is not presented through invented download or conversion metrics. The strongest proof is the shipped experience: a working privacy product available for real-device testing, supported by a complete brand and launch platform.</p>
            </div>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/12-landing-page.jpg" loading="lazy" alt="Safe Faces landing page routing users to TestFlight" class="image-one-window">
              <figcaption><span>12</span><strong>Landing page</strong> — Conversion-focused UX that explains the product and routes qualified users to TestFlight.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/13-interactive-demo.jpg" loading="lazy" alt="Safe Faces interactive demo with illustrated characters" class="image-one-window">
              <figcaption><span>13</span><strong>Interactive demo</strong> — Illustrated characters explain the product ethically—without using real children's faces as marketing material.</figcaption>
            </figure>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/14-testflight-funnel.jpg" loading="lazy" alt="Safe Faces TestFlight acquisition funnel" class="image-one-window">
              <figcaption><span>14</span><strong>TestFlight funnel</strong> — Trust sections, parent FAQs, and a clear path from landing page to open beta download.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section u-p-40-hero">
        <div class="container">
          <div class="wrapper-orange">
            <h2 class="h2">Unified Product Ecosystem</h2>
          </div>
          <div class="wrapper-blue u-mb-2 u-scroll-none">
            <div class="wrapper-blue-header u-p-20-around">
              <div class="wrapper-header u-mb-0">
                <p class="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">One responsibility across brand, product, and launch</p>
              </div>
            </div>
            <div class="u-p-20-around">
              <p class="text-paragraph u-text-gray">Safe Faces shows what happens when brand, product design, engineering, and messaging are developed around one clear responsibility. This was not simply an app for adding blur effects—it was the creation of a trusted product for parents who want to preserve and share childhood memories without making a child's identity public by default.</p>
              <p class="text-paragraph u-text-gray u-mt-2">The result is a cohesive ecosystem where the brand promise, interface, engineering, and marketing all support the same goal: helping adults share childhood moments more responsibly. Parents capture or import a photo or video, automatically cover every detected face, choose which faces should remain visible, and export a privacy-conscious copy ready to share.</p>
            </div>
            <figure class="case-study-visual">
              <img src="../images/case-studies/safefaces/15-full-ecosystem.jpg" loading="lazy" alt="Safe Faces full ecosystem — brand, app, and website" class="image-one-window">
              <figcaption><span>15</span><strong>Full ecosystem</strong> — Brand, iOS app, and landing page share one visual system and one privacy promise.</figcaption>
            </figure>
          </div>
        </div>
      </section>

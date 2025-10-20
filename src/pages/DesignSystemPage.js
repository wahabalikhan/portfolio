import React from 'react';
import BackButton from '../components/BackButton';

export default function DesignSystemPage({ setCurrentPage }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => setCurrentPage('home')} />
      
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Bridging gaps between UX x Eng through a Design System
      </h1>
      
      <img 
        src="/images/ds.png" 
        alt="Design System"
        className="w-full rounded-lg mb-8 border border-gray-200"
      />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Case study coming soon</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Just prepping up the materials for this case study, will be live shortly!
        </p>
      </section>

      {/*

      <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Project Involvement</h3>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Role:</span> Product Designer
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Team:</span> ETL Engineering Team
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Impact</h3>
          <p className="text-gray-700">
            36.1% design task speed increase through the ETL Design System
          </p>
        </div>
      </div>


      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Context & Challenge</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Design and engineering teams at Matillion were working in silos. Designers created mockups that engineers struggled to implement consistently. There was no shared language, no reusable components, and no systematic approach to building UI. This led to inconsistent experiences, slower development cycles, and friction between teams.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Organisation Context</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Matillion's ETL product had grown organically over time, resulting in visual and interaction inconsistencies. As the product scaled and teams expanded, the need for a unified design system became critical to maintain quality and velocity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Strategic Approach</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Vision & Objectives</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The goal was to create the 'ETL Design System'—a comprehensive system that would:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Bridge gaps between UX and Engineering teams</li>
          <li>Establish a shared design language</li>
          <li>Create reusable, well-documented components</li>
          <li>Foster a UX culture across the organization</li>
          <li>Increase design and development velocity</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Research & Foundation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I conducted an audit of existing UI patterns, interviewed designers and engineers about pain points, and researched industry-leading design systems. This formed the foundation for building a system tailored to Matillion's needs.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Execution & Leadership</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Building the System</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I led the creation of the ETL Design System, which included:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li><span className="font-semibold">Design tokens:</span> Colors, typography, spacing, and elevation scales</li>
          <li><span className="font-semibold">Component library:</span> Buttons, forms, navigation, data visualization components</li>
          <li><span className="font-semibold">Documentation:</span> Usage guidelines, do's and don'ts, accessibility standards</li>
          <li><span className="font-semibold">Code components:</span> React components matching design specifications</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Cross-Functional Collaboration</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          I worked closely with engineering leads to ensure the system was technically sound and easy to implement. Regular workshops and office hours helped teams adopt the system. I also created a contribution model where both designers and engineers could propose new components.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Cultural Shift</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Beyond the technical deliverables, I focused on fostering a UX culture. This meant educating teams on design thinking, establishing critique processes, and demonstrating the value of consistent, user-centered design across the organization.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Outcomes & Impact</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p className="text-2xl font-bold text-gray-900 mb-2">36.1% increase</p>
          <p className="text-gray-700">in design task speed after implementing the ETL Design System</p>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Results</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          The ETL Design System transformed how teams worked together. Designers could move faster using pre-built components. Engineers had clear specifications and reusable code. The shared language reduced miscommunication and improved collaboration. Product quality and consistency improved across the platform.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Team Feedback</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Teams reported feeling more confident in their work and appreciated having a single source of truth. The system became a reference point for onboarding new team members and maintaining quality as the organization scaled.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Learnings & Takeaways</h2>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Lessons Learned</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          A design system is not just a component library—it's a cultural shift. Success required buy-in from leadership, collaboration between disciplines, and ongoing maintenance. Documentation and education were just as important as the components themselves.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">Future Outlook</h3>
        <p className="text-gray-700 leading-relaxed">
          The ETL Design System continues to evolve as a living system. It has become foundational to how Matillion builds products and has set the standard for cross-functional collaboration in the organization.
        </p>
      </section> */}
      <Footer />
    </div>
  );
}
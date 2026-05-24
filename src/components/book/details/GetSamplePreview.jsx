const getSamplePreview = (bookId, category, title) => {
    const previews = {
      default: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">Book Sample Preview</h3>
          <p class="text-gray-700">This book will help you prepare for a fulfilling retirement journey.</p>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-[#C9A84C]">Chapter 1: Getting Started</h4>
            <p class="mt-2 text-gray-700">Retirement isn't just about stopping work—it's about starting a new chapter of growth, purpose, and meaningful connection.</p>
          </div>
          <p class="text-gray-700 mt-4">Purchase the full book to access all chapters.</p>
        </div>
      `,
      Retirement: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">Chapter 1: The Myth of the Golden Years</h3>
          <p class="text-gray-700">Why do so many retirees feel lost after the honeymoon phase ends? We unpack the psychological research behind retirement transitions and why a purely financial plan leaves you vulnerable to what experts call the "retirement shock."</p>
          <p class="text-gray-700 mt-2">The good news: with the right mindset and tools, you can turn this transition into the most vibrant chapter of your life. Let's begin.</p>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-[#C9A84C]">Key Takeaways:</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Financial readiness is only half the story</li>
              <li>Purpose and connection are equally important</li>
              <li>A holistic approach leads to better outcomes</li>
            </ul>
          </div>
        </div>
      `,
      Purpose: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">Chapter 3: Discovering Your Retirement Purpose</h3>
          <p class="text-gray-700">Purpose isn't a luxury—it's a psychological necessity. Studies show that retirees with a strong sense of purpose have better health outcomes, sharper cognition, and higher life satisfaction.</p>
          <p class="text-gray-700 mt-2">But how do you find purpose when you're no longer defined by your job title? This chapter guides you through a series of reflective exercises designed to uncover your core values, signature strengths, and the activities that create flow.</p>
          <p class="text-gray-700 mt-2"><strong>Key Insight:</strong> Purpose often hides at the intersection of what you love, what you're good at, and what the world needs.</p>
        </div>
      `,
      Lifestyle: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">Chapter 4: Designing Your Ideal Retirement Lifestyle</h3>
          <p class="text-gray-700">Where will you live? How will you spend your days? Who will you spend them with? These lifestyle decisions have a massive impact on your happiness—and your budget.</p>
          <p class="text-gray-700 mt-2">We explore the pros and cons of aging in place, relocating to a lower-cost area, or joining a vibrant retirement community.</p>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-[#C9A84C]">Case Study:</h4>
            <p class="text-gray-700">Meet Tom and Linda, who spent six months renting in three different retirement hotspots before choosing their forever home.</p>
          </div>
        </div>
      `,
      Workbooks: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">Workbook Introduction</h3>
          <p class="text-gray-700">This workbook is designed to be used alongside the main book. Each section includes fillable worksheets, checklists, and reflection prompts that turn abstract ideas into concrete action plans.</p>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-[#C9A84C]">Worksheet 1: Retirement Income Thermometer</h4>
            <p class="text-gray-700">List all your potential income sources and rate their reliability from 1-10. Then, identify gaps and brainstorm solutions.</p>
          </div>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-3">
            <h4 class="font-semibold text-[#C9A84C]">Worksheet 2: The Happiness Budget</h4>
            <p class="text-gray-700">Track activities that give you energy vs. drain you. Use our template to reallocate your time toward what matters most.</p>
          </div>
        </div>
      `,
      Guides: `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-[#1B2B4B]">The First 100 Days of Retirement</h3>
          <p class="text-gray-700">The transition into retirement is both exciting and disorienting. This practical guide walks you through what to expect—and what to do—during the critical first three months.</p>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-4">
            <h4 class="font-semibold text-[#C9A84C]">Week 1-2: The Celebration Phase</h4>
            <p class="text-gray-700">Rest, travel, indulge. But set a date to transition into structured exploration.</p>
          </div>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-3">
            <h4 class="font-semibold text-[#C9A84C]">Week 3-8: The Exploration Phase</h4>
            <p class="text-gray-700">Try 2-3 potential routines. Volunteer. Take a class. Start that side project. Experiment without commitment.</p>
          </div>
          <div class="bg-[#F8F5EF] p-4 rounded-lg mt-3">
            <h4 class="font-semibold text-[#C9A84C]">Week 9-12: The Integration Phase</h4>
            <p class="text-gray-700">Based on what you learned, design your sustainable routine. Build in checkpoints to reassess every six months.</p>
          </div>
        </div>
      `,
    };
  
    return previews[category] || previews.default;
  };
  
  export default getSamplePreview;
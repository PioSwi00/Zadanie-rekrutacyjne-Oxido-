import OpenAI from 'openai';
import fs from 'fs'; 
import 'dotenv/config';

if (!process.env.OPENAI_API_KEY) {
  console.error("Error: Missing OPENAI_API_KEY in the .env file.");
  process.exit(1);
}
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


function readArticleFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content.trim()) {
      throw new Error(`File ${filePath} is empty.`);
    }
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    process.exit(1); 
  }
}


async function generateHTMLContent(articleText) {
  if (!articleText) {
    console.error("No article text provided. Cannot generate HTML content.");
    return null;
  }

  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: "system", content: "You are a helpful assistant that generates structured HTML content." },
        { role: "user", content: `Please generate structured HTML content for the following article:
          Please generate a complete and structured HTML content for the following article. The content should be divided into well-defined sections with appropriate headers, paragraphs, and images. Follow these detailed instructions: 
            1. **Structure**: Organize the content with semantic HTML tags for readability and structure. Use: 
            -all content should be in div with class container
            - <h1> for the main title of the article. 
            - <h2> for section headings. 
            - <p> for each paragraph, ensuring proper spacing between paragraphs for readability. 
            - Additionally, use other HTML tags like <blockquote>, <strong>, <em>, <ul>, and <ol> where relevant, to highlight key points, important statements, or lists. This will enhance the visual appeal and readability of the article. 
            - Each section should be clearly separated and visually distinct to improve user experience. 
            - Nothing should disappear from the text, create the titles of each section based on its content
            2. **Images and Captions**: 
            -Include one image per major section. If logical, you may include additional images to visually support important subsections.
            - For each image, use an <img> tag with src='image_placeholder.jpg' and a detailed alt attribute that describes the content or concept of the image. This alt attribute should be clear and precise, serving as a prompt for generating the image. 
            - Wrap each image in a <figure> tag and add a <figcaption> below it. The caption should be descriptive, providing meaningful context about the image. 
            -
            3. **Readability and Flow**: 
            - Break the content into multiple logical sections to ensure readability. 
            - Add smooth transitions between sections using introductory or closing sentences.
            - Each section should flow naturally into the next, maintaining a consistent tone and structure.
            - Ensure each section is concise and uses short paragraphs for readability. Avoid overly long blocks of text.
            - Indent each paragraph to visually separate it from the previous one, enhancing readability.
            - Justify the text alignment across the article to create a clean, polished appearance.
            - Avoid typographic "widows" (orphans) by preventing single short words (such as "and," "in," "on") from being left alone at the end of a line. Make sure sentences wrap naturally without leaving such words isolated at line breaks to maintain typographic consistency.
            
            4. **Accessibility**: 
            - Ensure all images have meaningful alt attributes for better accessibility. 
            - Use descriptive and clear headings for each section. 
            5. **No CSS or JavaScript**: 
            - Do not include any inline CSS or JavaScript in the returned HTML. The code should only contain structural elements between <body> and </body>. Do not add <html>, <head>, or <body> tags. 
            The returned HTML code should be well-structured, visually appealing, and easy to read. Only include the elements required for structuring the content between the <body> and </body> tags. Ensure logical placement of images, captions, and other elements to support the article's content effectively. Do not add things like tyldas with html between\\n\n
          ${articleText}` }
      ]
    });

    const content = chatCompletion.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("No content received from OpenAI API.");
    }

    return content;
  } catch (error) {
    console.error("Error connecting to OpenAI API:", error.message);
    return null;
  }
}




function saveHTMLFile(content, filePath) {
  try {
    if (!content) {
      throw new Error("No content to save.");
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`File successfully saved to ${filePath}`);
  } catch (error) {
    console.error(`Error saving file ${filePath}:`, error.message);
  }
}

async function main() {
  console.log("Starting the process of generating HTML content...");

  const filePath = 'artykul.txt';
  const outputFilePath = 'artykul.html';

  const articleText = readArticleFile(filePath);
  console.log(`Article text successfully read from ${filePath}.`);

  const htmlContent = await generateHTMLContent(articleText);
  if (!htmlContent) {
    console.error("Failed to generate HTML content. Exiting process.");
    process.exit(1);
  }

  saveHTMLFile(htmlContent, outputFilePath);
  console.log(`HTML content saved to ${outputFilePath}. Process completed.`);
}


main();

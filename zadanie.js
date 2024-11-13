import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs'; 

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function readArticleFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// Funkcja do generowania HTML z OpenAI API
async function generateHTMLContent(articleText) {
  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: "system", content: "You are a helpful assistant that generates structured HTML content." },
        { role: "user", content: `Please generate structured HTML content for the following article. The content should be divided into clear sections with appropriate headers, paragraphs, and images. Follow these specific instructions:

                    1. **Structure**: Organize the content with semantic HTML tags for readability and structure. Use:
                    - <h1> for the main title of the article.
                    -<h2> for section headings.
                    -<p> for each paragraph, ensuring proper spacing between paragraphs for readability.
                    - Additionally, feel free to use other HTML tags like <blockquote>, <strong>, <em>, and <ul> or <ol> where relevant, to highlight key points, important statements, or lists. This will help make the article more engaging and visually appealing.
                    
                    2. **Images and Captions**: 
                    - Place images at logical points within the content to enhance comprehension and visual appeal, for me it should be under every big part of article.
                    - For each image, use an <img> tag with src="image_placeholder.jpg" and a precise alt attribute that describes the content or concept of the image. This alt attribute should act as a prompt for generating the image.
                    - Wrap each image in a <figure> tag and add a descriptive <figcaption> below it that provides a relevant caption for the image.

                    3. **Readability and Flow**: 
                    - Break the content into multiple sections to make it easier to read.
                    - Ensure that each section flows naturally, with logical transitions and well-defined subsections, if applicable.
                    
                    4. **No CSS or JavaScript**:
                    - Do not include any inline CSS or JavaScript in the returned HTML. The code should only contain structural elements between <body> and </body>. Do not add <html>, <head>, or <body> tags.

                    The returned HTML code should be well-structured, visually organized, and easy to read, with logical placements for images and captions to support the article's content. Only include elements needed for content structure.\n\n${articleText}` }
      ]
    });

    return chatCompletion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error connecting to OpenAI API:", error);
    return null;
  }
}

function saveHTMLFile(content, filePath) {
  if (content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`File saved to ${filePath}`);
  } else {
    console.error('No content to write to file.');
  }
}

// Funkcja główna do uruchomienia całego procesu
async function main() {
  const articleText = readArticleFile('artykul.txt'); // Wczytaj treść artykułu
  const htmlContent = await generateHTMLContent(articleText); // Wygeneruj HTML
  saveHTMLFile(htmlContent, 'artykul.html'); // Zapisz wynik do pliku artykul.html
}

main();

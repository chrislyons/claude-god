import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function loadGuideContent(collectionName: string) {
  // Fetch and sort sections
  const sections = (await getCollection(collectionName as any)).sort(
    (a, b) => a.data.section - b.data.section
  );

  // Render all sections
  const renderedSections = await Promise.all(
    sections.map(async (entry) => {
      const { Content } = await entry.render();
      const id = entry.slug.replace(/^\d+-/, '');
      return { id, Content };
    })
  );

  return renderedSections;
}

import { ScrollArea, ScrollBar } from "@src/components/ui/scroll-area";
import ScrollSpy from "react-ui-scrollspy";

/**
 * testing scrollspy
 * to be deleted
 */
const TestingScrollspy = () => {
  const sections = [...new Array(10)].map((_, i) => ({
    id: `section-${i}`,
    title: `Section ${i}`,
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rem illo fuga blanditiis molestiae, tenetur hic quia, minima corrupti consequuntur voluptates eveniet recusandae magni officiis quibusdam iusto quasi atque? Quos! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi in, modi rerum nisi nulla corrupti. Delectus incidunt officia optio! Quisquam facere voluptates quidem odio corrupti qui, velit omnis molestiae quis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veritatis commodi eligendi, facere voluptates et alias a quod fuga vitae, iste deleniti officiis aliquid at libero, hic odio impedit aut! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magnam deserunt laboriosam animi maxime facere, nam, minima aliquam aspernatur aut veniam facilis nesciunt nemo ullam, nobis soluta nulla mollitia accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod dolore non molestias dignissimos tempore ad, debitis quam ipsum corrupti nobis, magni, nulla placeat est culpa asperiores commodi fugiat porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio numquam corrupti illum. Repudiandae ad suscipit, voluptatem mollitia quasi facilis saepe, minus maxime, quae numquam dolorem dolores deserunt illo adipisci?`,
  }));

  return (
    <div className="">
      <div className="sticky top-topbar bg-slate-100">
        <h1 className="text-4xl">Dashboard</h1>
        <ScrollArea className="mb-4">
          <div className="flex gap-x-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="border border-black p-2"
                data-to-scrollspy-id={section.id}
              >
                {section.title}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <ScrollSpy offsetTop={0}>
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="py-4">
            <h1 className="text-bold text-2xl">{section.title}</h1>
            <p>{section.content}</p>
          </div>
        ))}
      </ScrollSpy>
    </div>
  );
};
export default TestingScrollspy;

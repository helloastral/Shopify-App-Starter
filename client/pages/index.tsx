import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { useAppQuery } from "../hooks";
import { useEffect } from "react";

export default function HomePage() {
  const { data } = useAppQuery({
    url: "/api/products",
  });

  useEffect(() => {
    console.log("Data Fetched", data);
  }, [data]);

  return (
    <Page narrowWidth>
      <TitleBar title="App name" />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div className="text-2xl text-blue-700 font-bold">Products</div>
            {/* {data?.body?.products && (
              <ol>
                {data?.body?.products.map((product: any, index: number) => (
                  <li key={index}>{product.title}</li>
                ))}
              </ol>
            )} */}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

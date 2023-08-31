import { Card, Page, Layout } from "@shopify/polaris";

import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const api = useApi();

  const { data } = useQuery(["products"], () => {
    return api.get(`/products`);
  });

  const products = data?.data || [];

  useEffect(() => {
    console.log("Data Fetched", products);
  }, [products]);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600 mb-5">
              Products
            </div>

            {products && (
              <ol>
                {products.map((product: any, index: number) => (
                  <li key={index}>{product.title}</li>
                ))}
              </ol>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

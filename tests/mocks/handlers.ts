import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          title: "iPhone 1",
          price: 300,
          thumbnail: "url",
          description: "iphone description 1",
        },
        {
          id: 2,
          title: "iPhone 2",
          price: 300,
          thumbnail: "url",
          description: "iphone description 2",
        },
        {
          id: 3,
          title: "iPhone 3",
          price: 300,
          thumbnail: "url",
          description: "iphone description 3",
        },
      ],
    });
  }),
];

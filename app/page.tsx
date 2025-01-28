"use client";

import MainLayout from "@/app/layouts/MainLayout";
import ClientOnly from "@/app/components/ClientOnly";
import PostMain from "@/app/layouts/PostMain";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="mt-[80px]  w-[calc(100%-90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            <PostMain
              post={{
                id: "123",
                user_id: "456",
                video_url: "/water.mp4",
                text: "this is some text",
                created_at: "2022-01-01T00:00:00Z",
                profile: {
                  user_id: "456",
                  name: "User 1",
                  image: "https://placehold.co/400",
                },
              }}
            />
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}

"use client"

import { WebGL } from "~/gl/tunnel"

import { BackgroundGradient } from "../background-gradient"

export const Welcome = () => {
  return (
    <div className="min-h-screen mx-auto pt-20 [&p+p]:mt-2 [&>a]:underline text-white py-18 z-10 [--rounded-lg:8px] [--rounded-md:4px]">
      <WebGL.In>
        <BackgroundGradient />
      </WebGL.In>

      <div className="relative max-w-[900px] mx-auto px-7 z-[1]">
        <div className="p-5 bg-gray/50 rounded-[var(--rounded-lg)] border border-[var(--color-gray-lighter)]">
          <p>
            👋 Hi there. You are on The Teleporter&#39;s{" "}
            <code className="px-1.5 py-0.5 rounded-[var(--rounded-md)] bg-[var(--color-gray-lighter)]">
              ogl-starter
            </code>{" "}
            .
          </p>
        </div>

        <h3 className="mt-8 font-semibold mb-4 text-lg">Links</h3>
        <div className="p-5 bg-gray/50 rounded-[var(--rounded-lg)] border border-[var(--color-gray-lighter)]">
          <p>
            🎨 You can find some of my crafts and designs on my site.&nbsp;
            <a
              target="_blank"
              href="https://theteleporter.site/craft"
              rel="noreferrer"
            >
              Check it out!
            </a>
          </p>
        </div>

        <h3 className="mt-8 font-semibold mb-4 text-lg">Debug mode</h3>
        <div className="p-5 bg-gray/50 rounded-[var(--rounded-lg)] border border-[var(--color-gray-lighter)]">
          <p className="mb-4">
            Add{" "}
            <code className="px-1.5 py-0.5 rounded-[var(--rounded-md)] bg-[var(--color-gray-lighter)]">
              ?debug
            </code>{" "}
            to the URL to enable the debug mode.
          </p>
          <p>
            🔎 Try pressing{" "}
            <code className="px-1.5 py-0.5 rounded-[var(--rounded-md)] bg-[var(--color-gray-lighter)]">
              ctrl+i
            </code>{" "}
            or{" "}
            <code className="px-1.5 py-0.5 rounded-[var(--rounded-md)] bg-[var(--color-gray-lighter)]">
              alt+i
            </code>{" "}
            to inspect boxes. Super useful for detecting overflows.
          </p>
        </div>

        <h3 className="mt-8 font-semibold mb-4 text-lg">Notes</h3>
        <div className="p-5 bg-gray/50 rounded-[var(--rounded-lg)] border border-[var(--color-gray-lighter)]">
          <p>
            💣 Pssst... You should delete this welcome component, it's under
            &nbsp;
            <code className="px-1.5 py-0.5 rounded-[var(--rounded-md)] bg-[var(--color-gray-lighter)]">
              ./src/components/common/welcome
            </code>
            .
          </p>
        </div>

        <h3 className="mt-8 font-semibold mb-4 text-lg">Credits</h3>
        <div className="p-5 bg-gray/50 rounded-[var(--rounded-lg)] border border-[var(--color-gray-lighter)]">
          <p>
            From the{" "}
            <a
              href="https://theteleporter.site"
              target="_blank"
              rel="noopener"
              style={{ fontWeight: "bold", textDecoration: "none" }}
            >
              Telecorp.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

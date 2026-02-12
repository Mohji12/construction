import { useEffect } from "react";

type ThreeDModelViewerProps = {
  /** Public URL or relative path to your .glb / .gltf file */
  src: string;
  /** Optional: alt text / short description of the model */
  alt?: string;
  /** Optional: custom className for sizing and layout */
  className?: string;
  /** Optional: remove default background for transparent display */
  transparent?: boolean;
  /** Optional: id for the model-viewer element (e.g. for orbit polling) */
  id?: string;
};

/**
 * Simple wrapper around the `<model-viewer>` web component so you can
 * drop a `.glb` 3D model into the site without extra React libraries.
 *
 * Usage:
 *
 *  <ThreeDModelViewer
 *    src="/models/your-model.glb"
 *    alt="My 3D building"
 *    className="w-full h-[400px]"
 *  />
 */
const ThreeDModelViewer = ({ src, alt, className, transparent, id }: ThreeDModelViewerProps) => {
  // Dynamically load the model-viewer script once on the client
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="model-viewer.min.js"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      // We leave the script in place so subsequent mounts are instant.
    };
  }, []);

  return (
    <model-viewer
      id={id}
      src={src}
      alt={alt}
      class={className}
      camera-controls
      auto-rotate
      disable-zoom={false}
      exposure="1"
      shadow-intensity="0.5"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        ...(transparent && { backgroundColor: "transparent" }),
      }}
    />
  );
};

export default ThreeDModelViewer;

// Tell TypeScript about the <model-viewer> element so JSX doesn't error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "disable-zoom"?: boolean;
        exposure?: string;
        "shadow-intensity"?: string;
        class?: string;
      };
    }
  }
}


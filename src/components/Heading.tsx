import React from "react";

export default function Heading({ heading }) {
  return (
    <h2 className="text-4xl font-semibold text-center py-4 text-gray-600">
      {heading}
    </h2>
  );
}

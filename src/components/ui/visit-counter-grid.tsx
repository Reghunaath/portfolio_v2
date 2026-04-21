"use client";

import { useEffect, useState } from "react";
import { CommitsGrid } from "@/components/ui/commits-grid";
import { PromptLine } from "@/components/ui/prompt-line";

export function VisitCounterGrid() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data: { count?: number | null }) => {
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="pt-16 pb-24">
      <PromptLine command="echo $UNIQUE_VISITORS" />

      <div className="mt-4 flex flex-col gap-4">
        {/* pixel grid — only shown once count is resolved */}
        <div className="flex flex-col gap-1.5">
{count !== null && <CommitsGrid text={String(count)} />}
        </div>
      </div>
    </section>
  );
}

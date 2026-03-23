import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className="flex items-center flex-wrap gap-y-1 text-sm"
        role="list"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {/* Separator — not before first item */}
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 text-uu-text-secondary mx-1 shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                /* Current / last item — not a link */
                <span
                  className="font-medium text-uu-text"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                /* Ancestor item — is a link */
                <Link
                  href={item.href}
                  className="text-uu-text-secondary hover:text-uu-text hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-uu-yellow rounded cursor-pointer"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

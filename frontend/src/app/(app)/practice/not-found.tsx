import Link from "next/link";
import "./practice.css";

export default function NotFound() {
  return (
    <div className="praxis-practice-lib">
      <div className="praxis-practice-empty">
        <h2 className="praxis-practice-empty-title">Practice card not found</h2>
        <p className="praxis-practice-empty-body">
          That card does not exist. Head back to the library to pick another.
        </p>
        <Link href="/practice" className="praxis-practice-primary">
          Back to Practice Library
        </Link>
      </div>
    </div>
  );
}

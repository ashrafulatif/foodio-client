import { OrderStatus } from "@/components/ui/orderCard";

const STATUS_STEPS: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
];

export const OrderProgressTracker = ({ status }: { status: OrderStatus }) => {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-0">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isLast = index === STATUS_STEPS.length - 1;

          return (
            <div key={step} className="flex items-center">
              {/* Step dot + label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    isCompleted
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-300"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold tracking-widest uppercase ${
                    isCompleted ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`w-4 h-[2px] lg:w-32 mb-5 ${
                    index < currentIndex ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

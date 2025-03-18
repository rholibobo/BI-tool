import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

interface CardDataValues {
  title: string;
  amount: number;
  // budgetamount: number ;
  percentage?: number | undefined;
  note?: string | undefined;
}

interface FinancialDataCardProps {
  data: CardDataValues[];
  route?: string;
}

function formatAmount(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

const FinancialDataCardDisplay: React.FC<FinancialDataCardProps> = ({
  data,
}) => {
  // const router = usePathname();
  return (
    <div className="flex justify-center items-center -mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 justify-items-center mx-auto w-[95%]">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-[328px] border border-[#E6E8ED] rounded-lg bg-[#FFF] p-5"
          >
            <div>
              <p className="font-medium text-gray-600">{item.title}</p>
              <p className="font-bold text-2xl text-main_black mt-2">
                {`${
                  item.title === "Total Users"
                    ? item.amount
                    : item.title === "Active Sessions"
                    ? item.amount
                    : formatAmount(item.amount)
                }`}
              </p>
            </div>{" "}
            <div className="flex gap-2 items-center mt-3">
              {item.percentage !== undefined && (
                <div className="flex gap-1 items-center py-1 px-2 bg-[#EAF2FD] border rounded-rounded_4 shadow-box_shadow text-sm">
                  <ArrowCircleUpIcon sx={{ color: "E6E8ED" }} />
                  <p className="text-main_black">{`+${item.percentage}%`}</p>
                </div>
              )}
              {item.note !== undefined && (
                <p className="text-xs text-main_grey">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialDataCardDisplay;

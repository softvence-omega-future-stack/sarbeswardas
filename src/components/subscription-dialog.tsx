"use client";
import CommonButton from "./common/button/CommonButton";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import CommonWrapper from "./common/space/CommonWrapper";
import Separator from "./common/space/Separator";

const planSpecifications = [
  "Your plan specification will show here.",
  "Your plan specification will show here.",
  "Your plan specification will show here.",
  "Your plan specification will show here.",
  "Your plan specification will show here.",
  "Your plan specification will show here.",
];

interface SubscriptionDropdownItemProps {
  handleClose: () => void;
}
const SubscriptionDropdownItem: React.FC<SubscriptionDropdownItemProps> = ({
  handleClose,
}) => {
  return (
    <CommonWrapper className="">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommonBorder className="min-w-[340px]">
            <div>
              <div className="w-full flex items-center justify-between pb-8">
                <CommonHeader size="md">Free</CommonHeader>
                <div className="flex">
                  <CommonHeader size="3xl">$0</CommonHeader>
                  <CommonHeader className="self-end" size="gray">
                    /1 month
                  </CommonHeader>
                </div>
              </div>
              <CommonHeader size="gray" className="dark:text-gray-400">
                You can make queries only with this plan.
              </CommonHeader>
              <Separator />

              <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 text-left pb-8">
                {planSpecifications.map((spec, index) => (
                  <CommonHeader size="gray" key={index}>
                    ✓ {spec}
                  </CommonHeader>
                ))}
              </div>
            </div>
            <CommonButton
              size="lg"
              variant="secondary"
              className="w-full  dark:border-gray-500 font-medium"
            >
              Your Current Plan
            </CommonButton>
          </CommonBorder>

          {/* Pro Plan */}
          <CommonBorder className="min-w-[340px]">
            <div>
              <div className="w-full flex items-center justify-between pb-8">
                <CommonHeader size="md">Pro</CommonHeader>
                <div className="flex">
                  <CommonHeader size="3xl">$19</CommonHeader>
                  <CommonHeader className="self-end" size="gray">
                    /1 month
                  </CommonHeader>
                </div>
              </div>
              <CommonHeader size="gray" className="dark:text-gray-400">
                You can make queries only with this plan.
              </CommonHeader>
              <Separator />

              <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 text-left pb-8">
                {planSpecifications.map((spec, index) => (
                  <CommonHeader size="gray" key={index}>
                    ✓ {spec}
                  </CommonHeader>
                ))}
              </div>
            </div>
            <CommonButton
              size="lg"
              variant="primary"
              className="w-full cursor-pointer  dark:border-gray-500 font-medium"
            >
              Purchase Now
            </CommonButton>
          </CommonBorder>
        </div>

        <div className="text-center mt-6">
          <CommonButton onClick={handleClose} variant="secondary" className="">
            Go Back
          </CommonButton>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default SubscriptionDropdownItem;

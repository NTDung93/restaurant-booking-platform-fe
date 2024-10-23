import { ReduxState } from '@/libs/redux/store';
import { MonthlyCommissionPayment } from '@/common/models/fee';

export const getFeesOfLocation = (
  state: ReduxState,
): MonthlyCommissionPayment | undefined => state.fee.monthlyCommissionPayment;

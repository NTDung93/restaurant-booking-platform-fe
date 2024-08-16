import theme from '@/theme';

const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {label}
    {required && (
      <span className="text-red-600 pl-1" style={{ color: theme.color.error }}>
        {' '}
        *
      </span>
    )}
  </>
);

export default CustomizeRequiredMark;

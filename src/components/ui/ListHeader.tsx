/* 
  TODO:
  1. search bar
  2. filters
*/
interface ListHeaderProps {
  title?: React.ReactNode;
  buttons?: React.ReactNode;
}
const ListHeader = ({ title, buttons }: ListHeaderProps) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        {title && (
          <h2 className="mb-4 text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight md:mb-0">
            {title}
          </h2>
        )}
      </div>
      <div className="flex md:ml-4">{buttons}</div>
    </div>
  );
};
export default ListHeader;

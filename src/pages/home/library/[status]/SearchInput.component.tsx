import { Input, InputProps } from '@heroui/react';
import { MdSearch } from 'react-icons/md';

const SearchInput = ({ ...props }: InputProps) => {
  return (
    <>
      <Input
        startContent={<MdSearch />}
        placeholder="find in your library"
        className=" rounded-sm sticky top-0 z-20"
        variant="bordered"
        radius="sm"
        {...props}
      />
    </>
  );
};

export default SearchInput;

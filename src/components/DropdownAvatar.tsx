import { AvatarFallback, Avatar as ShadcnAvatar } from '@/components/ui/avatar';
import { useRouter } from '@/i18n/routing';
import { loggedOut } from '@/redux/store/authSilce';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { CgProfile } from 'react-icons/cg';
import { CiDark, CiLight, CiLogout } from 'react-icons/ci';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { TiMessageTyping } from 'react-icons/ti';

const DropdownAvatar = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('navbar');
  const route = useRouter();
  const { user } = useAppSelector((state) => state.persistedReducer);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <ShadcnAvatar className=" cursor-pointer  m-2">
            {user.avatarBuilt ? (
              <AvatarFallback
                dangerouslySetInnerHTML={{
                  __html: user.avatarBuilt,
                }}></AvatarFallback>
            ) : (
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            )}
          </ShadcnAvatar>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          <DropdownSection showDivider>
            <DropdownItem
              key="profile"
              onClick={() => {
                navigate('/setting');
              }}
              startContent={<CgProfile size={28} />}>
              {t('drop drow options.profile')}
            </DropdownItem>
            <DropdownItem
              closeOnSelect={false}
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              key="new"
              startContent={
                theme === 'light' ? <CiDark size={28} /> : <CiLight size={28} />
              }>
              {theme === 'light'
                ? t('drop drow options.theme.dark')
                : t('drop drow options.theme.light')}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider>
            <DropdownItem
              onClick={() => {
                dispatch(loggedOut());
              }}
              key="log out"
              startContent={<CiLogout size={28} />}>
              {t('drop drow options.log out')}
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key="help"
              startContent={<IoMdHelpCircleOutline size={28} />}>
              {t('drop drow options.help')}
            </DropdownItem>
            <DropdownItem
              key="response"
              startContent={<TiMessageTyping size={28} />}>
              {t('drop drow options.response')}
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownAvatar;

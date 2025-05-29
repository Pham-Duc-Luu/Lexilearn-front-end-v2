import setting from '@/assets/locales/en/setting.page.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/seperator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@heroui/react';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';

const SettingDialog = ({
  children = <Button>setting box</Button>,
}: {
  children?: ReactNode;
}) => {
  const { t, i18n } = useTranslation('setting');
  const tabContents = [
    t('account.title'),
    t('language_and_location.title'),
    t('notifications.title'),
    t('security.title'),
    t('privacy.title'),
  ];
  const available_languages_obj =
    setting['language_and_location']['language']['avaliable language'];

  const available_lanuages = Object.entries(available_languages_obj).map(
    ([key, name]) => ({
      key,
      name,
    })
  );

  const [language, setLanguage] = useState('en');

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] p-0 gap-0">
          <DialogHeader className=" p-6">
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Separator className=""></Separator>

          <div>
            <Tabs
              defaultValue="account"
              className=" flex m-0"
              orientation="vertical">
              <TabsList className=" grid grid-cols-1 h-full rounded-none m-0 w-56">
                {tabContents.map((item, index) => {
                  return (
                    <TabsTrigger
                      className=" content-start text-lg  justify-start p-6"
                      value={item}
                      key={index}>
                      {item}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent
                value={t('language_and_location.title')}
                className=" m-6 h-fit flex justify-between items-center w-full">
                <Label className=" text-lg">
                  {t('language_and_location.language.title')}
                </Label>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className=" w-52 rounded-sm justify-between flex border-b-2 p-2">
                      <span>
                        {t(
                          `language_and_location.language.avaliable language.${language}`
                        )}
                      </span>
                      <FaAngleDown size={20} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent aria-label="Static Actions">
                    {available_lanuages.map((item) => (
                      <DropdownMenuItem
                        key={item.key}
                        onClick={() => {
                          setLanguage(item.key);
                          i18n.changeLanguage(item.key);
                        }}>
                        {t(
                          `language_and_location.language.avaliable language.${item.key}`
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsContent>
            </Tabs>
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingDialog;

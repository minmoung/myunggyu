import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _langs, _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { searchRows } from 'src/sections/comm/DatabaseApi';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';

// import { LanguagePopover } from '../components/language-popover';   // 다국어컴포넌트 (기능X)
// import { NotificationsPopover } from '../components/notifications-popover';   // 알림컴포넌트 (기능X)

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [menuTop, setMenuTop] = useState();
  const [loading, setLoading] = useState(true);

  const layoutQuery: Breakpoint = 'lg';

  const [searchUrl, setSearchUrl] = useState('/api/dashboard/searchMenuTop');

  const fetchData = useCallback(async () => {

      setLoading(true);
 
      const result = await searchRows(null, searchUrl);
      // console.log("result.message : ", result.message); // 서버 응답 처리      
      if (result.message) {
        // 서버의 경고 메시지 처리
        // showAlert(result.message, 'warning');
      }
      
      try {
        console.log('result   ==>' , result);
        setMenuTop(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
  }, [searchUrl]);

  // 컴포넌트가 마운트될 때 데이터를 한 번 가져옴
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            
            leftArea: (
              <> 
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={menuTop}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                {/*
                <LanguagePopover data={_langs} />  // 다국어 컴포넌트
                <NotificationsPopover data={_notifications} />  // 알림컴포넌트
                */}
                <AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        !loading && menuTop ? (
          <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={menuTop} />
        ) : (
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh' // 전체 화면의 높이를 채워서 세로 중앙 정렬
          }}>Loading...</div> // 로딩 중에 보여줄 UI (필요 시 수정)
        )
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}

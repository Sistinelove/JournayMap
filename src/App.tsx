import {AsideHeader} from '@gravity-ui/navigation';
import {Ghost} from '@gravity-ui/icons';
import {MainWrapper} from '@/components/Wrapper/MainWrapper';
import {ThemeProvider} from '@gravity-ui/uikit';

const App = () => {
    return (
        <ThemeProvider theme={'dark'}>
            <AsideHeader
                logo={{icon: Ghost, text: 'vite-example'}}
                compact={true}
                hideCollapseButton={true}
                renderContent={() => <MainWrapper title={'Главная'} />}
            />
        </ThemeProvider>
    );
};

export default App;

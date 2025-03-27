import {AsideHeader} from '@gravity-ui/navigation';
import {Ghost} from '@gravity-ui/icons';
import {MainWrapper} from '@/components/Wrapper/MainWrapper';

const App = () => {
    return (
        <AsideHeader
            logo={{icon: Ghost, text: 'vite-example'}}
            compact={true}
            hideCollapseButton={true}
            renderContent={() => <MainWrapper title={'Главная'} />}
        />
    );
};

export default App;

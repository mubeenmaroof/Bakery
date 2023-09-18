
import { WebView } from 'react-native-webview';

function WebPage() {
    return (
        <WebView
            style={{ flex: 1 }}
            source={{ uri: 'https://erozgaar.pitb.gov.pk/' }}
        />
    )
}

export { WebPage };
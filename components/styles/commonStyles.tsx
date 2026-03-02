// components/styles/commonStyles.tsx
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    backgroundBase: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    background: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2,
    },
    content: {
        flex: 1,
        margin: 20,
        marginTop: 20,
    },
    banner: {
        padding: 20,
        paddingTop: 40,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 15,
        marginBottom: 0,
        padding: 20,
    },
    navbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // zIndex: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRightWidth: 1,
        borderColor: '#888',
    },
    tab: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 3,
        paddingVertical: 15,
        borderLeftWidth: 1,
        borderColor: '#888',
        // borderRightWidth: 1,
    },
    activeTab: {
        color: '#fff',
        backgroundColor: '#aaa',
        fontWeight: 'bold',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    image: {
		width: '100%',
		height: 150,
		// Styling for the tour image.
	},
	dealCardText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 5,
		marginHorizontal: 10,
		// Styling for the tour name.
	},
	buttonWithShadow: {
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS
		backgroundColor: '#fff',
		elevation: 2, // Android
		width: '100%',
		justifyContent: 'center',
		alignSelf: 'center',
		marginBottom: 40,
		borderRadius: 10,
	}
});
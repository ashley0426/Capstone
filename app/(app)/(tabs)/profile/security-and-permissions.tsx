import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Switch,
	Modal,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import BackButton from '@/components/BackButton';
import PageTitle from '@/components/PageTitle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { getValueFor } from '@/components/auth/secureStoreHelper';

import common from '@/components/styles/commonStyles';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const SecurityAndPermissions = () => {
	const [saveLoginInfo, setSaveLoginInfo] = useState(true);
	const [twoStepAuthentication, setTwoStepAuthentication] = useState(true);
	const [cameraAccess, setCameraAccess] = useState(true);
	const [locationAccess, setLocationAccess] = useState(true);

	const insets = useSafeAreaInsets();

	return (
		<View style={{ flex: 1, paddingTop: insets.top }}>
			<Image style={common.background} source={require('@/assets/images/BackgroundCircles.png')} />
			<BackButton />
			<PageTitle text="Security & Permissions" />

			<View style={styles.container}>
				<Text style={[styles.settingText, { textAlign: 'center' }]}>
					Get notified when you receive notifications
				</Text>

				<View style={{ marginTop: '30%' }}>
					<Text style={styles.label}>Security</Text>
					<View style={styles.switchRow}>
						<Text style={styles.switchText}>Save login info</Text>
						<Switch value={saveLoginInfo} onValueChange={setSaveLoginInfo} />
					</View>

					<View style={styles.switchRow}>
						<Text style={styles.switchText}>2 Step Authentication</Text>
						<Switch value={twoStepAuthentication} onValueChange={setTwoStepAuthentication} />
					</View>
				</View>

				<View style={styles.divider}></View>

				<View>
					<Text style={styles.label}>Device Permissions</Text>
					<View style={styles.switchRow}>
						<Text style={styles.switchText}>Access to Cameraroll</Text>
						<Switch value={cameraAccess} onValueChange={setCameraAccess} />
					</View>

					<View style={styles.switchRow}>
						<Text style={styles.switchText}>Location</Text>
						<Switch value={locationAccess} onValueChange={setLocationAccess} />
					</View>
				</View>

				<DeleteAccountSection />
			</View>
		</View>
	);
};

async function getIdToken(): Promise<string> {
	return getValueFor('idToken');
}

export function DeleteAccountSection() {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		setError(null);
		try {
			const idToken = await getIdToken();
			if (!idToken) throw new Error('Missing id_token');

			const res = await fetch("https://plusplaygroundhub-au-6c6uz4csla-ts.a.run.app/v1/user/delete/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id_token: idToken }),
		});

		if (!res.ok) {
		let message = `Delete failed (${res.status})`;
		try {
			const data = await res.json();
			if (data?.error) message = data.error;
		} catch {}
		throw new Error(message);
		}

			setSuccess(true);
			setTimeout(() => {
				router.replace("/");
			}, 1500);
		} catch (e: any) {
			setError(e?.message ?? 'Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.deleteSection}>
			<Text style={styles.deleteTitle}>Delete account</Text>
			<Text style={styles.deleteDescription}>
				Permanently remove your account and associated data. This action cannot be undone.
			</Text>

			<TouchableOpacity
				onPress={() => setConfirmOpen(true)}
				disabled={loading}
				style={[styles.deleteButton, loading && { opacity: 0.5 }]}
			>
				<Text style={styles.deleteButtonText}>🗑 Delete account</Text>
			</TouchableOpacity>

			<Modal
				visible={confirmOpen}
				transparent
				animationType="fade"
				onRequestClose={() => !loading && setConfirmOpen(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalCard}>
						<Text style={styles.modalTitle}>
							Are you sure you want to delete your account?
						</Text>
						<Text style={styles.modalMessage}>
							This action is permanent and cannot be undone.
						</Text>

						{error && (
							<View style={[styles.alertBox, styles.errorBox]}>
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)}
						{success && (
							<View style={[styles.alertBox, styles.successBox]}>
								<Text style={styles.successText}>Account deleted. Redirecting…</Text>
							</View>
						)}

						<View style={styles.modalActions}>
							<TouchableOpacity
								style={[styles.cancelButton, loading && { opacity: 0.6 }]}
								disabled={loading}
								onPress={() => setConfirmOpen(false)}
							>
								<Text style={styles.cancelText}>Cancel</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.confirmButton, (loading || success) && { opacity: 0.6 }]}
								disabled={loading || success}
								onPress={handleDelete}
							>
								{loading ? (
									<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
										<ActivityIndicator color="#fff" />
										<Text style={styles.confirmText}>Deleting…</Text>
									</View>
								) : (
									<Text style={styles.confirmText}>Delete account</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: '15%',
	},
	switchRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	switchText: {
		fontSize: 17,
		lineHeight: 45,
	},
	label: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: '5%',
	},
	settingText: {
		fontSize: 17,
		marginLeft: '5%',
	},
	divider: {
		height: 1,
		backgroundColor: '#000',
		marginVertical: '15%',
	},

	deleteSection: {
		marginTop: 40,
		borderWidth: 1,
		borderColor: '#e5e5e5',
		borderRadius: 16,
		padding: 20,
		backgroundColor: '#fff',
	},
	deleteTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	deleteDescription: {
		marginTop: 4,
		fontSize: 14,
		color: '#525252',
	},
	deleteButton: {
		marginTop: 16,
		alignSelf: 'flex-start',
		backgroundColor: '#dc2626',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#fca5a5',
	},
	deleteButtonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 14,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	modalCard: {
		width: '100%',
		maxWidth: 380,
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 24,
		elevation: 8,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	modalMessage: {
		marginTop: 8,
		fontSize: 14,
		color: '#525252',
	},
	modalActions: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 24,
		gap: 12,
	},
	alertBox: {
		marginTop: 12,
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
	},
	errorBox: {
		backgroundColor: '#fee2e2',
		borderColor: '#fca5a5',
	},
	errorText: {
		color: '#b91c1c',
	},
	successBox: {
		backgroundColor: '#d1fae5',
		borderColor: '#6ee7b7',
	},
	successText: {
		color: '#065f46',
	},
	cancelButton: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#d4d4d4',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10,
	},
	cancelText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#262626',
	},
	confirmButton: {
		backgroundColor: '#dc2626',
		borderWidth: 1,
		borderColor: '#fca5a5',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10,
	},
	confirmText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
	},
});

export default SecurityAndPermissions;

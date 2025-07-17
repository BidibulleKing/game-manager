import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './authModal.module.css';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		tag: '',
		password: '',
		avatar: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { login, register } = useAuth();

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			if (isLogin) {
				await login({ tag: formData.tag, password: formData.password });
			} else {
				await register({
					tag: formData.tag,
					password: formData.password,
					avatar: formData.avatar || undefined,
				});
			}
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
					<button className={styles.closeBtn} onClick={onClose}>×</button>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.field}>
						<label>Tag utilisateur</label>
						<input
							type="text"
							name="tag"
							value={formData.tag}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					<div className={styles.field}>
						<label>Mot de passe</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</div>

					{!isLogin && (
						<div className={styles.field}>
							<label>Avatar (URL)</label>
							<input
								type="url"
								name="avatar"
								value={formData.avatar}
								onChange={handleChange}
								disabled={loading}
							/>
						</div>
					)}

					{error && <div className={styles.error}>{error}</div>}

					<button type="submit" disabled={loading} className={styles.submitBtn}>
						{loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
					</button>
				</form>

				<div className={styles.switchMode}>
					<button
						type="button"
						onClick={() => setIsLogin(!isLogin)}
						className={styles.switchBtn}
					>
						{isLogin ? 'Créer un compte' : 'Déjà un compte ?'}
					</button>
				</div>
			</div>
		</div>
	);
}

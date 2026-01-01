import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Zap
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '@/constants/theme';

export default function HomeScreen() {
  return (
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <View style={styles.logoBox}>
            <Leaf size={20} color={COLORS.white} />
          </View>
          <Text style={styles.headerTitle}>ChiliLeaf<Text style={{color: COLORS.primary}}>Detection</Text></Text>
        </View>
        
      </View>

      {/* Hero Section */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{zIndex: 10}}>
          <View style={styles.heroBadge}>
            <Leaf size={14} color="white" />
            <Text style={styles.heroBadgeText}>AGRO INTELLIGENCE</Text>
          </View>
          <Text style={styles.heroTitle}>Lindungi Tanaman Cabai Anda.</Text>
          <Text style={styles.heroSubtitle}>Deteksi penyakit tanaman secara instan menggunakan AI.</Text>
          <TouchableOpacity 
            style={styles.heroBtn}
            // onPress={() => setActiveTab('scan')}
          >
            <Text style={styles.heroBtnText}>Mulai Deteksi</Text>
            <ArrowRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {/* Abstract Shapes */}
        <View style={[styles.circleShape, { right: -30, bottom: -30, width: 150, height: 150 }]} />
        <View style={[styles.circleShape, { right: 20, top: 20, width: 80, height: 80, opacity: 0.2 }]} />
      </LinearGradient>

      {/* Features Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.featureCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#eff6ff' }]}>
            <Zap size={22} color="#2563eb" />
          </View>
          <Text style={styles.featureTitle}>Cepat</Text>
          <Text style={styles.featureDesc}>Hasil dalam 2 detik</Text>
        </View>
        <View style={styles.featureCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#f3e8ff' }]}>
            <ShieldCheck size={22} color="#9333ea" />
          </View>
          <Text style={styles.featureTitle}>Akurat</Text>
          <Text style={styles.featureDesc}>Teknologi AI Terkini</Text>
        </View>
      </View>

      {/* Guide Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Panduan Singkat</Text>
          <Text style={styles.linkText}>Lihat Semua</Text>
        </View>
        {[
          { id: 1, title: 'Siapkan Foto', desc: 'Pastikan cahaya cukup terang' },
          { id: 2, title: 'Fokus Gejala', desc: 'Foto bagian daun yang sakit' },
          { id: 3, title: 'Dapatkan Solusi', desc: 'Ikuti saran pengobatan' },
        ].map((item, idx) => (
          <View key={idx} style={styles.guideItem}>
            <View style={styles.guideNumber}>
              <Text style={styles.guideNumberText}>{item.id}</Text>
            </View>
            <View>
              <Text style={styles.guideItemTitle}>{item.title}</Text>
              <Text style={styles.guideItemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 12,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  infoBtn: {
    width: 40, 
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  // Hero Styles
  heroCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    opacity: 0.9,
  },
  heroBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    marginBottom: 6,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.primaryLight,
    marginBottom: 20,
    maxWidth: '85%',
  },
  heroBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBtnText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 14,
    marginRight: 6,
  },
  circleShape: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 999,
    opacity: 0.1,
  },
  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {width:0, height:2}
  },
  iconCircle: {
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  featureTitle: {
    fontWeight: '700',
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  // Guide Section
  sectionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  guideItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  guideNumber: {
    width: 32,
    height: 32,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guideNumberText: {
    fontWeight: '700',
    color: COLORS.textLight,
  },
  guideItemTitle: {
    fontWeight: '700',
    color: COLORS.text,
    fontSize: 14,
  },
  guideItemDesc: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  // Scan Page Styles
  fullScreenContainer: {
    flex: 1,
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    paddingHorizontal: 24,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scanAreaContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scanFrame: {
    backgroundColor: 'white',
    height: 400,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emptyScanState: {
    alignItems: 'center',
  },
  scanIconBg: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyScanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  emptyScanDesc: {
    color: COLORS.textLight,
    marginBottom: 20,
  },
  cameraBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    elevation: 4,
  },
  cameraBtnText: {
    color: 'white',
    fontWeight: '700',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontWeight: '600',
  },
  // Result Area
  resultContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  analyzeBtn: {
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  analyzeBtnGradient: {
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeBtnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 40,
  },
  resultHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: COLORS.textLight,
  },
  resultName: {
    fontSize: 22,
    fontWeight: '800',
  },
  confidenceBadge: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  confidenceLabel: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  resultBody: {
    padding: 24,
  },
  resultSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  resultText: {
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: 20,
  },
  solutionBox: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  solutionItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  solutionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  retryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  retryText: {
    color: COLORS.textLight,
    fontWeight: '600',
  },
  // Library Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: COLORS.textLight,
  },
  libraryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
  },
  libraryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  libraryContent: {
    flex: 1,
  },
  libraryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  libraryDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  libraryLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Profile Styles
  profileHeader: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#f1f5f9',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  profileRole: {
    color: COLORS.textLight,
    fontSize: 12,
    marginBottom: 16,
  },
  editProfileBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editProfileText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuText: {
    fontWeight: '600',
    color: COLORS.text,
  },
  // Bottom Nav Styles
  navWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    width: width * 0.85,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  navIconContainer: {
    padding: 10,
    borderRadius: 30,
  },
  navIconActive: {
    backgroundColor: COLORS.primary,
    transform: [{translateY: -5}],
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  }
});

import {
  Activity,
  Camera,
  Image as ImageIcon,
  Info,
  Leaf,
  RefreshCw,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../constants/theme";

// --- TENSORFLOW IMPORTS ---
import * as tf from '@tensorflow/tfjs';




const CLASS_LABELS = ['Antraknosa', 'Bercak Daun', 'Sehat', 'Virus Kuning'];

const SERVER_URL = 'https://20a4908b9ad6.ngrok-free.app/predict'; 
// const SERVER_URL = 'http://127.0.0.1:8000/predict'; 
// const SERVER_URL = 'http://192.168.100.10:5000/'; 


const DISEASE_DATABASE = [
  {
    id: 'healthy',
    name: 'Tanaman Sehat',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    description: 'Kondisi tanaman prima. Daun hijau segar, tidak ada bercak, lubang, atau kerutan.',
    solution: [
      'Pertahankan jadwal penyiraman.',
      'Lanjutkan pemupukan organik.',
      'Pantau hama secara berkala.'
    ]
  },
  {
    id: 'cercospora',
    name: 'Bercak Daun (Cercospora)',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: 'Bercak bulat kecil abu-abu dengan tepi coklat. Daun dapat menguning dan rontok.',
    solution: [
      'Semprot fungisida sistemik.',
      'Bersihkan gulma di sekitar tanaman.',
      'Atur drainase tanah dengan baik.'
    ]
  },
  {
    id: 'murda complex(mites,trips)',
    name: 'Murda Complex (Tungau & Trips)',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    iconColor: 'text-rose-600',
    description: 'Kerusakan daun akibat serangan tungau dan trips, daun menggulung dan bercak keperakan.',
    solution: [
      'Gunakan insektisida/akarisida sesuai dosis.',
      'Kurangi populasi hama vektor.',
      'Pantau tanaman secara rutin.'
    ]
  },
  {
    id: 'nutritional',
    name: 'Defisiensi Nutrisi',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
    description: 'Gejala kekurangan unsur hara seperti daun menguning atau pertumbuhan terhambat.',
    solution: [
      'Tambahkan pupuk sesuai kebutuhan tanaman.',
      'Periksa pH tanah.',
      'Gunakan pupuk berimbang.'
    ]
  },
  {
    id: 'powdery mildew',
    name: 'Powdery Mildew (Embun Tepung)',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    iconColor: 'text-slate-600',
    description: 'Lapisan putih seperti bedak pada permukaan daun akibat infeksi jamur.',
    solution: [
      'Semprot fungisida khusus embun tepung.',
      'Kurangi kelembapan lingkungan.',
      'Perbaiki sirkulasi udara.'
    ]
  }
];


const ScanScreen = () => {
  type ScanResult = {
    id?: string;
    name: string;
    confidence: number;
    description: string;
    solution: string[];
    color?: string;
    bgColor?: string;
    iconColor?: string;
  } | null;

  const [isTfReady, setIsTfReady] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ScanResult>(null);

  // 1. INISIALISASI TFJS & LOAD MODEL
 

  // 2. FUNGSI AMBIL GAMBAR (Kamera / Galeri)
  const pickImage = async (source: string) => {
    let result;
    
    // Cek Izin & Buka Kamera/Galeri
    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (perm.status !== 'granted') return Alert.alert('Izin Ditolak', 'Aplikasi butuh akses kamera');
      
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, 
        aspect: [1, 1],      
        quality: 1,
      });
    } else {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== 'granted') return Alert.alert('Izin Ditolak', 'Aplikasi butuh akses galeri');

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setResult(null); // Reset hasil scan sebelumnya
    }
  };


//   const analyzeImage = async () => {
//     if (!selectedImage) return;
//     setIsAnalyzing(true);

//     try {
//       // Siapkan data file
//       // const formData = new FormData();
//       // formData.append('file', {
//       //   uri: selectedImage,
//       //   name: 'upload.jpg',
//       //   type: 'image/jpeg',
//       // } as any); 

//       const responseImg = await fetch(selectedImage);
// const blob = await responseImg.blob();

// const formData = new FormData();
// formData.append('file', blob, 'upload.jpg');


//       console.log(`Mengirim ke: ${SERVER_URL}`);

//       // Kirim Request
//       const response = await fetch(SERVER_URL, {
//         method: 'POST',
//         body: formData,
//         // headers: {
//         //   'Content-Type': 'multipart/form-data',
//         // },
//       });

//       const data = await response.json();
//       console.log("Respon Server:", data);

//       if (data.error) throw new Error(data.error);

//       // Cocokkan nama kelas dari server dengan database lokal
//       const serverClass = data.kelas || "Tidak Dikenali";
      
//       const serverClassId = data.class_id;

// const matchedInfo = DISEASE_DATABASE.find(
//   d => d.id === serverClassId
// );


//       // Set Hasil untuk ditampilkan
//       if (matchedInfo) {
//         setResult({
//           ...matchedInfo,
//           confidence: data.confidence
//         });
//       } else {
//         // Fallback jika penyakit tidak ada di database UI
//         setResult({
//           name: serverClass,
//           color: '#334155',
//           bgColor: '#f1f5f9',
//           description: "Deskripsi belum tersedia di aplikasi.",
//           solution: ["Hubungi ahli pertanian."],
//           confidence: data.confidence
//         });
//       }

//     } catch (error) {
//       console.error("Gagal:", error);
//       Alert.alert(
//         "Gagal Terhubung", 
//         "Pastikan:\n1. Server python (app.py) sudah jalan.\n2. IP Address di kodingan benar.\n3. HP dan Laptop satu jaringan."
//       );
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

const analyzeImage = async () => {
  if (!selectedImage) return;
  setIsAnalyzing(true);

  try {
    const imgResponse = await fetch(selectedImage);
    const blob = await imgResponse.blob();

    const formData = new FormData();
    // formData.append('file', blob, 'upload.jpg');

    formData.append('file', {
  uri: selectedImage,
  name: 'photo.jpg',
  type: 'image/jpeg',
} as any);

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log("Respon Server:", data);

    if (data.detail) throw new Error("Format request salah");

    const serverClassId = data.kelas;

    const matchedInfo = DISEASE_DATABASE.find(
      d => d.id === serverClassId
    );

    if (matchedInfo) {
      setResult({
        ...matchedInfo,
        confidence: data.confidence
      });
    } else {
      setResult({
        name: "Tidak Dikenali",
        description: "Penyakit tidak terdaftar",
        solution: ["Hubungi ahli pertanian"],
        confidence: data.confidence
      });
    }

  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Gagal memproses gambar");
  } finally {
    setIsAnalyzing(false);
  }
};


  const resetScan = () => {
    setSelectedImage(null);
    setResult(null);
  };

  // --- TAMPILAN (UI) ---




  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scanner</Text>
        <Text style={styles.subtitle}>Analisis kesehatan tanaman</Text>
      </View>

      {/* Image Box */}
      <View style={styles.imageBox}>
        {selectedImage ? (
          <>
            <Image source={{ uri: selectedImage }} style={styles.preview} />

            {!result && !isAnalyzing && (
              <TouchableOpacity style={styles.closeBtn} onPress={resetScan}>
                <X size={20} color="#fff" />
              </TouchableOpacity>
            )}

            {isAnalyzing && (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#34d399" />
                <Text style={styles.loadingText}>Menganalisis...</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.uploadBox}>
            <View style={styles.iconCircle}>
              <Camera size={32} color="#059669" />
            </View>

            <Text style={styles.uploadTitle}>Upload Foto</Text>
            <Text style={styles.uploadSubtitle}>
              Pilih metode pengambilan gambar
            </Text>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => pickImage('camera')}>
              <Camera size={18} color="#fff" />
              <Text style={styles.primaryBtnText}>Ambil Foto (Kamera)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => pickImage('gallery')}
            >
              <ImageIcon size={18} color="#059669" />
              <Text style={styles.secondaryBtnText}>Upload Galeri</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Analyze Button */}
      {selectedImage && !result && !isAnalyzing && (
        <TouchableOpacity style={styles.analyzeBtn} onPress={analyzeImage}>
          <Activity size={22} color="#fff" />
          <Text style={styles.analyzeText}>Analisis Sekarang</Text>
        </TouchableOpacity>
      )}

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.badge}>HASIL DETEKSI</Text>
            <Text style={styles.resultTitle}>{result.name}</Text>
            <Text style={styles.confidence}>{result.confidence}%</Text>
          </View>

          <View style={styles.resultBody}>
            <Text style={styles.sectionTitle}>
              <Info size={14} /> Gejala
            </Text>
            <Text style={styles.description}>{result.description}</Text>

            <View style={styles.solutionBox}>
              <Text style={styles.sectionTitle}>
                <Leaf size={14} /> Rekomendasi
              </Text>
              {result.solution.map((item, i) => (
                <Text key={i} style={styles.solutionItem}>
                  {i + 1}. {item}
                </Text>
              ))}
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={resetScan}>
              <RefreshCw size={16} color="#64748b" />
              <Text style={styles.resetText}>Scan Tanaman Lain</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Loading Styles
  centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.latar },
  loadingTextMain: { marginTop: 15, color: COLORS.text, fontWeight: '700', fontSize: 16 },
  loadingTextSub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  imageBox: {
    height: 350,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#e2e8f0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "600",
  },
  uploadBox: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 16,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#059669",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#059669",
    fontWeight: "700",
  },
  analyzeBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#059669",
    paddingVertical: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  analyzeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginTop: 20,
    overflow: "hidden",
    elevation: 4,
  },
  resultHeader: {
    backgroundColor: "#ecfdf5",
    padding: 16,
  },
  badge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#475569",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#059669",
    marginTop: 4,
  },
  confidence: {
    fontWeight: "800",
    color: "#059669",
    marginTop: 4,
  },
  resultBody: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 12,
  },
  solutionBox: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  solutionItem: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 4,
  },
  resetBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  resetText: {
    color: "#64748b",
    fontWeight: "600",
  },
});


const { width } = Dimensions.get('window');


export default ScanScreen;

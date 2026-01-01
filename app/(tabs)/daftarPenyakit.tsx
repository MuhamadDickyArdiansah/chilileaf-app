import { ChevronRight, Leaf, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  ColorValue,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const DISEASE_DATABASE = [
  {
    id: 'healthy',
    name: 'Tanaman Sehat',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    confidence: 98,
    description: 'Kondisi tanaman prima. Daun hijau segar, tidak ada bercak, lubang, atau kerutan.',
    solution: ['Pertahankan jadwal penyiraman.', 'Lanjutkan pemupukan organik.', 'Pantau hama secara berkala.']
  },
  {
    id: 'anthracnose',
    name: 'Antraknosa (Patek)',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    iconColor: 'text-rose-600',
    confidence: 92,
    description: 'Bercak melingkar coklat/hitam pada daun atau buah. Sering muncul saat lembab tinggi.',
    solution: ['Potong bagian terinfeksi & bakar.', 'Semprot fungisida (mankozeb).', 'Kurangi kelembapan area.']
  },
  {
    id: 'leaf_curl',
    name: 'Virus Gemini (Kuning)',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
    confidence: 89,
    description: 'Daun menguning terang, mengeriting, dan kerdil. Disebabkan vektor kutu kebul.',
    solution: ['Cabut tanaman sakit (eradikasi).', 'Basmi kutu kebul.', 'Pasang perangkap kuning.']
  },
  {
    id: 'cercospora',
    name: 'Bercak Daun',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    confidence: 94,
    description: 'Bercak bulat kecil abu-abu dengan tepi coklat. Daun bisa menguning dan rontok.',
    solution: ['Semprot fungisida sistemik.', 'Bersihkan gulma sekitar.', 'Atur drainase tanah.']
  }
];

const LibraryScreen = () => {
  const [query, setQuery] = useState("");

  const filteredData = DISEASE_DATABASE.filter((item: { name: string; }) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pustaka</Text>
        <Text style={styles.subtitle}>Database penyakit cabai</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Search size={18} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          placeholder="Cari penyakit..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          placeholderTextColor="#94a3b8"
        />
      </View>

      {/* List */}
      <View style={styles.list}>
        {filteredData.map((item: { id: React.Key | null | undefined; bgColor: any; iconColor: ColorValue | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={styles.card}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: item.bgColor },
              ]}
            >
              <Leaf size={24} color={item.iconColor} />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </View>

            <ChevronRight size={18} color="#cbd5f5" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  searchWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    fontSize: 14,
    color: "#1e293b",
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "700",
    color: "#1e293b",
    fontSize: 14,
  },
  cardDesc: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});


export default LibraryScreen;

import { StyleSheet, View } from "react-native";
import { Modal as PaperModal, Text, Portal, Divider } from "react-native-paper";

interface Props {
  visible: boolean;
  onDismiss: (value: boolean) => void;
}
const Modal: React.FC<Props> = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss as any}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          marginHorizontal: 20,
        }}
      >
        <View>
          <Text>On todos page:</Text>
          <Text style={styles.indent}>Press to set done/undone</Text>
          <Text style={styles.indent}>Hold to remove</Text>
        </View>
        <Divider style={{ paddingVertical: 1, marginVertical: 5 }} />
        <View>
          <Text>On removed todos page:</Text>
          <Text style={styles.indent}>Press to bring back</Text>
          <Text style={styles.indent}>Hold to delete todo</Text>
        </View>
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  indent: {
    paddingVertical: 2,
    paddingLeft: 3,
  },
});

export default Modal;

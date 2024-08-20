import {Layout} from "antd";
import LeftSider from "./LeftSider"
import Header from "./Header";
import RightSider from "./RightSider";
import Center from "./Center";
// @ts-ignore
import styles from "./index.module.less";

function EditPage() {
    return (
        <Layout className={styles.main}>
            <Header />
            <div className={styles.content}>
                <LeftSider />
                <Center />
                <RightSider />
            </div>
        </Layout>
    )
}

export default EditPage;
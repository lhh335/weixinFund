import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './Agreement.css';

const Item = Flex.Item;
function AgreementPage() {
  return (
    <div style={{ padding: '0 16px' }}>
      <Flex direction="column">
        <Item className={styles.heading}>嘉实财富网络服务使用协议</Item>
        <p className={styles.text} style={{ textIndent: 28 }}>
          嘉实财富管理有限公司提供的网络服务，服务使用人（以下称“用户”）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。
        </p>
      </Flex>
      <Flex direction="column" align="start" flex="1">
        <h6 className={styles.subhead}>1. 服务内容</h6>
        <p className={styles.text}>
          1.1 嘉实财富网络服务的具体内容由嘉实财富根据实际情况提供。
        </p>
        <h6 className={styles.subhead}>2. 服务变更、中断或终止</h6>
        <p className={styles.text}>
          2.1
          用户理解，嘉实财富需要定期或不定期地对提供网络服务的平台（如互联网网站、移动应用程序，微信平台等）或相关的设备进行检修或者维护，嘉实财富无需为此承担任何责任，但嘉实财富应尽可能事先进行通告。
        </p>
        <p className={styles.text}>
          2.2
          无论本协议是否有其他约定，如发生下列任何一种情形，嘉实财富有权随时中断或终止向用户提供本协议项下的网络服务而无需对用户或任何第三方承担任何责任或义务：
        </p>
        <p className={styles.text}>2.2.1 用户提供的个人资料不真实；</p>
        <p className={styles.text}>
          2.2.2
          用户违反本协议中规定的使用规则及不时的更新、嘉实财富不时发布及更新的相关操作规则及要求；
        </p>
        <p className={styles.text}>
          2.2.3 用户恶意操作、诋毁、损害嘉实财富声誉；
        </p>
        <p className={styles.text}>
          2.2.4
          用户利用嘉实财富网络服务从事违反国家法律法规活动（包括但不限于洗钱）。
        </p>
        <p className={styles.text}>
          2.3
          在2.2.4的情况下，如有关政府主管部门要求嘉实财富配合相关调查、采取相关监管、处罚措施，嘉实财富将尽全力配合，因此给用户带来的操作不能、操作不便等，嘉实财富不承担任何责任。
        </p>
        <p className={styles.text}>
          2.4
          如变更、中断或终止的网络服务属于免费网络服务，嘉实财富无需通知用户，也无需对任何用户或任何第三方承担任何责任。
        </p>
        <h6 className={styles.subhead}>3. 使用规则</h6>
        <p className={styles.text}>
          3.1
          用户在申请使用嘉实财富网络服务时，必须向嘉实财富提供真实准确的个人资料，如个人资料有任何变动，须及时根据嘉实财富的业务规则向嘉实财富更新。
        </p>
        <p className={styles.text}>
          3.2
          用户注册成功后，嘉实财富将向用户配发一个用户帐号、密码，用户应当对以其用户帐号进行的所有活动和事件负法律责任。
        </p>
      </Flex>
    </div>
  );
}

AgreementPage.defaultProps = {};

AgreementPage.propTypes = {};

export default AgreementPage;

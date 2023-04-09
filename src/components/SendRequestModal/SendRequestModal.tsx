import { Button, Input, Modal } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IAddedScope {
  id: string;
  name: string;
}

const SendRequestModal = ({ isModalOpen, handleOk, handleCancel, onChangeScopes, scopes }: any) => {
  const [addedScopes, setAddedScopes] = React.useState<IAddedScope[]>(scopes);
  const [newScope, setNewScope] = React.useState<string>('');
  return (
    <Modal
      title='Send Request'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => {
            onChangeScopes(addedScopes);
            handleOk();
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <div style={{ margin: '20px 0' }}>
        <label htmlFor='new-scope' style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Add Scope:
        </label>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            style={{ width: '100%' }}
            onChange={(e) => {
              setNewScope(e.target.value);
            }}
            value={newScope}
          />
          <Button
            type='primary'
            style={{ marginLeft: '10px' }}
            onClick={() => {
              if (newScope === '') return;
              const newScopes = [
                ...addedScopes,
                {
                  id: uuidv4(),
                  name: newScope,
                },
              ];
              setAddedScopes(newScopes);
              setNewScope('');
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor='scope' style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Scopes:
        </label>
        {addedScopes && addedScopes.length > 0 ? (
          addedScopes.map((scope: any) => (
            <div key={scope.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <Input
                style={{ width: '100%' }}
                value={scope.name}
                onChange={(e) => {
                  const findScope = addedScopes.find((s) => s.id === scope.id);
                  if (findScope) {
                    findScope.name = e.target.value;
                  }
                  setAddedScopes([...addedScopes]);
                }}
              />
              <Button
                type='primary'
                danger
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  const filteredScopes = addedScopes.filter((s) => s.id !== scope.id);
                  setAddedScopes(filteredScopes);
                }}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No scopes available</p>
        )}
      </div>
    </Modal>
  );
};

export default SendRequestModal;

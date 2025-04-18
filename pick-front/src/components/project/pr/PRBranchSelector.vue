<template>
    <div class="branch-wrapper">
        <v-icon class="branch-icon" icon="mdi-source-branch" />

        <!-- base 브랜치 -->
        <div class="branch-box base-box">
            <div class="branch-label">base :</div>
            <div class="branch-value">{{ baseBranch }}</div>
        </div>

        <span class="branch-arrow">←</span>

        <!-- head 브랜치 -->
        <div class="branch-box">
            <div class="branch-label">head :</div>
            <template v-if="disableSelect">
                <div class="branch-value">{{ head || '선택된 브랜치 없음' }}</div>
            </template>
            <template v-else>
                <v-select v-model="head" :items="branches" variant="plain" hide-details density="compact"
                    menu-icon="mdi-menu-down" class="branch-select" />
            </template>
        </div>

        <!-- 경고 문구 -->
        <div v-if="!head && !disableSelect" class="warning-box">
            <span class="icon">❌</span>
            <span class="label">자동 머지 방지</span>
            <span class="desc">PR을 생성할 브랜치를 선택해주세요.</span>
        </div>
    </div>
</template>



<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
    defaultBranch: String,          // base로 표시할 브랜치
    selectedBranch: String,         // head 브랜치(외부에서 고정)
    disableSelect: Boolean,         // 선택 불가능하게 할지
})

const emit = defineEmits(['update:selectedBranch'])

const baseBranch = ref(props.defaultBranch || 'main')
const head = ref(props.selectedBranch || null)

const branches = ref([])
const dummyBranches = ['main', 'feature/ui', 'feature/backend']

watch(head, (newVal) => {
    emit('update:selectedBranch', newVal)
})

onMounted(async () => {
    try {
        const res = await fetch(
            `http://localhost:8000/pick-service/api/github/branches?repo=Pick&owner=BE14-NoB`,
            { method: 'GET' }
        )

        if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data)) {
                branches.value = data
            } else {
                console.warn('⚠️ 잘못된 형식의 브랜치 데이터입니다. 기본 브랜치 목록 사용!')
                branches.value = dummyBranches
            }
        } else {
            console.warn(`⚠️ HTTP ${res.status} 오류. 기본 브랜치 목록 사용!`)
            branches.value = dummyBranches
        }
    } catch (err) {
        console.error('❌ 브랜치 목록 요청 실패:', err)
        branches.value = dummyBranches
    }
})

</script>

<style scoped>
.branch-wrapper {
    display: flex;
    align-items: center;
    background-color: #f6f8fa;
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid #d0d7de;
    max-width: 1200px;
    height: 60px;
    gap: 16px;
    font-family: 'Segoe UI', sans-serif;
}

.branch-icon {
    color: #57606a;
    font-size: 22px;
}

.branch-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    background-color: #ffffff;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #d0d7de;
    height: 36px;
    min-width: 250px;
}

.branch-label {
    font-size: 13px;
    color: #57606a;
}

.base-box {
    background-color: #f3f4f6;
    border: 1px solid #d0d7de;
}

.branch-value {
    font-weight: 600;
    font-size: 14px;
    color: #999999;
}

.branch-arrow {
    font-size: 24px;
    color: #57606a;
    font-weight: 900;
    margin: 0 4px;
}

.branch-select>>>.v-field {
    background-color: transparent;
    border: none;
    box-shadow: none;
    min-height: 0;
    padding: 0;
}

.branch-select>>>.v-field__input {
    font-weight: 600;
    font-size: 14px;
    color: #24292f;
    padding: 0 !important;
}

.branch-select>>>.v-label {
    display: none;
}

.branch-select>>>.v-input__control {
    padding: 0;
    min-height: 0;
}

.warning-box {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 20px;
    font-size: 14px;
}

.warning-box .icon {
    font-size: 18px;
    color: #e5534b;
}

.warning-box .label {
    color: #e5534b;
    font-weight: 600;
}

.warning-box .desc {
    color: #57606a;
}
</style>
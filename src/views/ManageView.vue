<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <Upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :i="i"
              :update-song="updateSong"
              :remove-song="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUserStore from '../stores/user'
import Upload from '../components/Upload.vue'
import CompositionItem from '../components/CompositionItem.vue'
import { songsCollection, auth } from '../includes/firebase'
export default {
  name: 'ManageView',
  components: { Upload, CompositionItem },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get() // search all the songs associated with user
    snapshot.forEach(this.addSong)
  },
  data() {
    return {
      unsavedFlag: false,
      songs: []
    }
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next()
    } else {
      const leave = confirm('Are you sure you want to leave?')
      next(leave)
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()
  //   //console.log('beforeRouteEnter Guard')
  //   if (!store.userLoggedIn) {
  //     next({ name: 'home' })
  //   } else {
  //     next()
  //   }
  // },
}
</script>
